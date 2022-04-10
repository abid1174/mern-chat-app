import React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContextProvider } from "./context/ToastContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
//@ts-ignore
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
