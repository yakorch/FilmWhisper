import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import {Root} from "./routes/Root";
import ErrorPage from "./errorPage";
import {UserAccount} from "./routes/UserAccount/UserAccount";
import {FilterSection} from "./routes/FilterSection/FilterSection";
import {FAQSection} from "./routes/FAQSection/FAQSection";
import {ThemeProvider} from "@mui/material";
import theme from "./theme.js";


const router = createBrowserRouter([{
    path: "/", element: <Root/>, errorElement: <ErrorPage/>, children: [{
        path: "/", element: <FilterSection/>
    }, {
        path: "faq", element: <FAQSection/>
    }, {
        path: "user-account", element: <UserAccount/>
    },]
}]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
    <ThemeProvider theme={theme}>

        <RouterProvider router={router}/>

    </ThemeProvider>
</React.StrictMode>);
