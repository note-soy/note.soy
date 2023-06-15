import React, {FC} from "react";
import {Page, PageContent, PageHeader} from "grommet";
import {useParams} from "react-router-dom";

export const EditorPage: FC = () => {
    const { id } = useParams();
    return <Page>
        <PageHeader title={id}/>
        <PageContent>
            {id}
        </PageContent>
    </Page>
}