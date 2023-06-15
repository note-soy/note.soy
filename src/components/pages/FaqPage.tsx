import React, {FC} from "react";
import {MenuPage} from "../MenuPage";
import {PageContent, PageHeader} from "grommet";

export const FaqPage: FC = () => {
    return <MenuPage>
        <PageHeader title={'FAQ'}/>
        <PageContent>
            Test
        </PageContent>
    </MenuPage>
}