import {Anchor, Button, Nav, RoutedAnchor} from "grommet"
import {NavLink, useLocation} from "react-router-dom";
import {FC} from "react";

const Link: FC<{to: string, content: string}> = ({to, content}) => {

    return <NavLink to={to} >
        {({ isActive, isPending }) => (
            <Button disabled={isActive}>{content}</Button>
        )}
    </NavLink>

}

export const DefaultNav = () => {

    return <Nav
        direction='row'
        justify={'center'}
    >
        <Link to={'/faq'} content={'FAQ'}/>
    </Nav>
}