import React from 'react';
import './App.css';
import {Image, Page, PageContent, PageHeader, Text} from "grommet";

export const App = () => {

    return <Page>
        <PageHeader
            title={"note.soy"}
        />
        <PageContent>
            <Image src={"/soyjak.gif"}/>
        </PageContent>
    </Page>

}
