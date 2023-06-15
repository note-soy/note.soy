import React from 'react';
import './App.css';
import {Router} from "./Router";
import {Grommet, Main, ThemeType} from "grommet";

const myTheme: ThemeType = {
    global: {
        colors: {
            grey0: "black",
            grey1: "#111111",
            grey2: "#222222",
            grey3: "#333333",
            grey4: "#444444",
            grey5: "#555555",
            grey6: "#666666",
            grey7: "#777777",
            grey8: "#888888",
            grey9: "#999999",
            greyA: "#AAAAAA",
            greyB: "#BBBBBB",
            greyC: "#CCCCCC",
            greyD: "#DDDDDD",
            greyE: "#EEEEEE",
            greyF: "white",
        },
        backgrounds: {
            anchor: 'greyA',
            anchorHover: 'grey8',
            anchorClick: 'grey4',
        },
    },
    header: {

    },
    anchor: {
        color: 'bigtest'
    },
    button: {
        active: {
            background: 'anchor'
        },
        primary: {
            background: 'black'
        },
        secondary: {
            background: 'black'
        },
        hover: {
            color: 'grey1'
        }
    }
};

export const App = () => {

    return <Grommet theme={myTheme}>
        <Main>
            <Router />
        </Main>
    </Grommet>

}
