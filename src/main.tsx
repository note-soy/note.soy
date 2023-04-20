import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import './index.css';
import {Grommet} from "grommet";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Grommet>
            <App />
        </Grommet>
    </React.StrictMode>,
);
