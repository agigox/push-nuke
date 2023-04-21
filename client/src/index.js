import React from 'react';

import './styles/index.less';
import 'antd/dist/reset.css';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';

// eslint-disable-next-line react/jsx-filename-extension

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container); // createRoot(container!) if you use TypeScript
// eslint-disable-next-line react/jsx-filename-extension
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
