import {Header, Image, Page, PageContent, PageHeader} from "grommet";
import React from "react";
import {DefaultNav} from "../DefaultNav";
import {MenuPage} from "../MenuPage";

export const HomePage = () =><>
    <MenuPage>
        <PageHeader
            title={"note.soy"}
        />
        <PageContent>
            <Image src={"/soyjak.gif"}/>
        </PageContent>
    </MenuPage>
</>