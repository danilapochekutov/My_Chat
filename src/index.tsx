import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";

import { getFirestore } from "firebase/firestore";

import "./firebaseConfig.ts";

import { Provider } from "react-redux";
import store from "./store/index";

import "./index.css";

const firestore = getFirestore();

const rootElement = document.getElementById("root");

if (rootElement !== null) {
    const root = ReactDOM.createRoot(rootElement as HTMLElement);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
} else {
    throw new Error("Root element not found");
}
