import React, {FC, useCallback, useEffect, useState} from "react";
import {Box, Heading, Page, PageContent, PageHeader, TextArea} from "grommet";
import {NavLink, useParams} from "react-router-dom";
import {Soyjak} from "../../Soyjak";
import {getNote, saveNote} from "../../api";
import debounce from 'lodash/debounce';

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
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        
        if (id) {
            debouncedSave(id, newValue);
        }
    };

    return <Page height={'99vh'} width={{max: '99vw'}}>
        <header>
            <Box direction={'row'} pad={{left: "medium"}} gap={"small"}>
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
        </header>
        <PageContent>
            <Box
                border
                round={"small"}
                width={'99vw'}
                height={'xxlarge'}
                pad={"medium"}
            >
                <TextArea
                    fill
                    value={value}
                    onChange={handleChange}
                    resize={false}
                    plain
                />
            </Box>
        </PageContent>
    </Page>;
}