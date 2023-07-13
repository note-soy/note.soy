import React, {FC, useEffect, useState} from "react";
import {Box, Heading, Page, PageContent, PageHeader, TextArea} from "grommet";
import {NavLink, useParams} from "react-router-dom";
import {Soyjak} from "../../Soyjak";
import {getNote} from "../../api";

export const EditorPage: FC = () => {
    const { id } = useParams();
    const [value, setValue] = useState("");

    useEffect(() => {
        if (id) {
            getNote(id).then(r => setValue(r.data.content))
        }
    }, [id]);

    return <Page height={'99vh'} width={{max: '99vw'}}>
        <header>
            <Box direction={'row'} pad={{left: "medium"}} gap={"small"}>
                <Box width={'xxsmall'}>
                    <NavLink to={'/'}>
                        <Soyjak/>
                    </NavLink>
                </Box>
                <Heading level={3} margin={'small'}>{id}</Heading>
            </Box>
        </header>
        <PageContent>
            <Box
                border
                round={"small"}
                width={'99vw'}
                height={'xxlarge'}
            >
                <TextArea
                    plain
                    resize={false}
                    focusIndicator={false}
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    style={{
                        height: "100%",
                        overflow: "visible",
                        minHeight: "fit-content"
                    }}
                />
            </Box>
        </PageContent>
    </Page>;
}