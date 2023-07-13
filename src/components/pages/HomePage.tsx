import {Box, Form, Header, Image, Page, PageContent, PageHeader, TextInput} from "grommet";
import React, {useCallback} from "react";
import {MenuPage} from "../MenuPage";
import {Soyjak} from "../../Soyjak";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {

    const navigate = useNavigate();

    const submitHandler = useCallback((e: {value: { doc?: string } } ) => {
        const doc = e?.value?.doc;
        if (doc) {
            navigate(`/note/${doc}`);
        } else {
            alert('wrong');
        }
    }, [navigate]);

    return <>
        <MenuPage>
            <PageHeader
                title={"note.soy"}
            />
            <PageContent>
                {/*TODO shit's fucked on dark mode */}
                <Soyjak/>
                <Box style={{
                    position: "relative",
                    top: "-32vh",
                    width: "40%"
                    // left: "-5vh",
                    // width:
                }}>
                    <Form
                        onSubmit={submitHandler}
                    >
                        <TextInput name="doc" size={"xsmall"} onSubmit={() => alert('submitted')}/>
                    </Form>
                </Box>
            </PageContent>
        </MenuPage>
    </>
}