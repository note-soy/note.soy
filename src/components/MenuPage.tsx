import {Header, Heading, Image, Page, PageContent, PageHeader, Text} from "grommet";
import {DefaultNav} from "./DefaultNav";
import React, {FC} from "react";

interface MenuPageProps {
    children: React.ReactNode
}

export const MenuPage: FC<MenuPageProps> = ({children}) => {
    return <>
        <Header
            height={{min: '5vh'}}
            width={{min: '50vh'}}
        >
            {/*TODO logo aligned to the left, nav items spread about center*/}
            <Text>LOGO</Text>
            <DefaultNav />
        </Header>
        <Page
            height={{min: '95vh'}}
        >
            {children}
        </Page>
    </>
}