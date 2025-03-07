import React, { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { Box } from 'grommet';
import { marked } from 'marked';
import './MarkdownEditor.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectionRange, setSelectionRange] = useState<{start: number, end: number} | null>(null);
  const [previewScrollPosition, setPreviewScrollPosition] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Parse markdown to HTML
  const renderMarkdown = (text: string): string => {
    const result = marked(text, { 
      breaks: true,
      gfm: true
    });
    
    // Handle both string and Promise<string> return types
    if (typeof result === 'string') {
      return result;
    } else {
      // For async case, we'll return empty string initially
      // and update the state when the promise resolves
      result.then((html: string) => {
        // This would need to be handled with state in a real implementation
        console.log('Async markdown parsing completed');
      }).catch((err: Error) => {
        console.error('Error parsing markdown:', err);
      });
      return '';
    }
  };

  // Handle switching between edit and preview modes
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditing) {
      setIsEditing(true);
      
      // Save preview scroll position
      if (editorRef.current) {
        setPreviewScrollPosition(editorRef.current.scrollTop);
      }
      
      // Try to position cursor near the click position in preview mode
      if (editorRef.current && textareaRef.current) {
        const clickY = e.clientY - editorRef.current.getBoundingClientRect().top + editorRef.current.scrollTop;
        const previewHeight = editorRef.current.scrollHeight;
        const textareaHeight = value.split('\n').length;
        
        // Estimate the line number based on click position
        const estimatedLine = Math.floor((clickY / previewHeight) * textareaHeight);
        
        // Find the position in the text for this line
        const lines = value.split('\n');
        let position = 0;
        
        for (let i = 0; i < Math.min(estimatedLine, lines.length); i++) {
          position += lines[i].length + 1; // +1 for the newline character
        }
        
        // Set this as the new cursor position
        setCursorPosition(position);
      }
    }
  };

  // Handle blur event to switch back to preview mode
  const handleBlur = () => {
    // Only switch to preview mode if there's content
    if (value.trim().length > 0) {
      setIsEditing(false);
    }
  };

  // Insert text at cursor position
  const insertTextAtCursor = (
    insertBefore: string,
    insertAfter: string = '',
    defaultText: string = ''
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const text = selectedText || defaultText;
    
    const newValue = 
      value.substring(0, start) + 
      insertBefore + 
      text + 
      insertAfter + 
      value.substring(end);
    
    onChange(newValue);
    
    // Set cursor position appropriately
    setTimeout(() => {
      if (textarea) {
        if (selectedText) {
          // If text was selected, place cursor after the inserted text
          textarea.selectionStart = start + insertBefore.length;
          textarea.selectionEnd = start + insertBefore.length + text.length;
        } else {
          // If no text was selected, place cursor between the inserted markers
          const cursorPos = start + insertBefore.length + defaultText.length;
          textarea.selectionStart = cursorPos;
          textarea.selectionEnd = cursorPos;
        }
      }
    }, 0);
  };

  // Handle key events in the textarea
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    // Handle tab key to insert spaces instead of changing focus
    if (e.key === 'Tab') {
      e.preventDefault();
      
      // Insert 2 spaces at cursor position
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }
      }, 0);
    }
    
    // Auto-pair characters
    const pairs: Record<string, string> = {
      '(': ')',
      '[': ']',
      '{': '}',
      '*': '*',
      '_': '_',
      '`': '`',
      '"': '"',
      "'": "'"
    };
    
    if (pairs[e.key] && selectedText) {
      e.preventDefault();
      insertTextAtCursor(e.key, pairs[e.key]);
      return;
    }
    
    // Handle common markdown shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b': // Bold
          e.preventDefault();
          insertTextAtCursor('**', '**', 'bold text');
          break;
          
        case 'i': // Italic
          e.preventDefault();
          insertTextAtCursor('*', '*', 'italic text');
          break;
          
        case 'k': // Link
          e.preventDefault();
          insertTextAtCursor('[', '](url)', 'link text');
          break;
          
        case '`': // Code
          e.preventDefault();
          if (selectedText.includes('\n')) {
            insertTextAtCursor('```\n', '\n```', 'code block');
          } else {
            insertTextAtCursor('`', '`', 'code');
          }
          break;
      }
    }
  };

  // Handle paste events to handle plain text
  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // Handle scroll events in the textarea to sync with preview
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (isEditing && textareaRef.current) {
      const scrollPercentage = textareaRef.current.scrollTop / 
        (textareaRef.current.scrollHeight - textareaRef.current.clientHeight);
      
      // Save this percentage for when we switch to preview mode
      setPreviewScrollPosition(scrollPercentage);
    }
  };

  // Restore scroll position when switching between edit and preview modes
  useEffect(() => {
    if (!isEditing && editorRef.current) {
      // If previewScrollPosition is a percentage (between 0 and 1)
      if (previewScrollPosition <= 1) {
        const maxScroll = editorRef.current.scrollHeight - editorRef.current.clientHeight;
        editorRef.current.scrollTop = previewScrollPosition * maxScroll;
      } else {
        // If it's an absolute position
        editorRef.current.scrollTop = previewScrollPosition;
      }
    }
  }, [isEditing, previewScrollPosition]);

  // Update the textarea when value changes externally
  useEffect(() => {
    if (textareaRef.current && isEditing) {
      textareaRef.current.focus();
      if (selectionRange) {
        textareaRef.current.selectionStart = selectionRange.start;
        textareaRef.current.selectionEnd = selectionRange.end;
      } else {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = cursorPosition;
      }
    }
  }, [isEditing, cursorPosition, selectionRange]);

  // Save cursor position when editing
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCursorPosition(e.target.selectionStart);
    setSelectionRange({
      start: e.target.selectionStart,
      end: e.target.selectionEnd
    });
    onChange(e.target.value);
  };

  return (
    <Box 
      className="markdown-editor-container" 
      fill
      onClick={handleClick}
    >
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextareaChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onScroll={handleScroll}
          className="markdown-textarea"
          autoFocus
          spellCheck
        />
      ) : (
        <div 
          ref={editorRef}
          className="markdown-preview"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
        />
      )}
    </Box>
  );
}; 