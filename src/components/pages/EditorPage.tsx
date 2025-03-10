import React, {FC, useCallback, useEffect, useState} from "react";
import {Box, Heading, Page, PageContent} from "grommet";
import {NavLink, useParams} from "react-router-dom";
import {Soyjak} from "../../Soyjak";
import {getNote, saveNote} from "../../api";
import debounce from 'lodash/debounce';
import { MarkdownEditor } from "../../components/MarkdownEditor";
import { ThemeToggle } from '../ThemeToggle';

export const EditorPage: FC = () => {
    const { id } = useParams();
    const [value, setValue] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Create a debounced save function
    const debouncedSave = useCallback(
        debounce((noteId: string, content: string) => {
            setIsSaving(true);
            saveNote(noteId, content)
                .then(() => {
                    setLastSaved(new Date());
                })
                .catch(error => {
                    console.error('Error saving note:', error);
                })
                .finally(() => {
                    setIsSaving(false);
                });
        }, 1000),
        []
    );

    // Load note content when component mounts or id changes
    useEffect(() => {
        if (id) {
            getNote(id).then(r => setValue(r.data.content))
        }
    }, [id]);

    // Handle content changes
    const handleChange = (newValue: string) => {
        setValue(newValue);
        
        if (id) {
            debouncedSave(id, newValue);
        }
    };

    return <Page height={'99vh'} width={{max: '99vw'}}>
        <header>
            <Box 
                direction={'row'} 
                pad={{left: "medium"}} 
                align="center"
                justify="between"
                width="100%"
            >
                <Box direction="row" gap="small" align="center">
                    <Box width={'xxsmall'}>
                        <NavLink to={'/'}>
                            <Soyjak/>
                        </NavLink>
                    </Box>
                    <Heading level={3} margin={'small'}>{id}</Heading>
                    {isSaving && <Box margin={'small'}>Saving...</Box>}
                    {lastSaved && !isSaving && (
                        <Box margin={'small'}>
                            Last saved: {lastSaved.toLocaleTimeString()}
                        </Box>
                    )}
                </Box>
                <ThemeToggle />
            </Box>
        </header>
        <PageContent>
            <Box
                border
                round={"small"}
                width={'99vw'}
                height={'xxlarge'}
                pad={"medium"}
                overflow="hidden"
                
            >
                <MarkdownEditor
                    value={value}
                    onChange={handleChange}
                />
            </Box>
        </PageContent>
    </Page>;
}