import React from "react";
import ReactDOM from "react-dom/client";
import {Root} from "./routes/Root";
import ErrorPage from "./errorPage";
import {UserAccount} from "./routes/UserAccount/UserAccount";
import {FilterSection} from "./routes/FilterSection/FilterSection";
import {FAQSection} from "./routes/FAQSection/FAQSection";
import {ThemeProvider} from "@mui/material";
import theme from "./theme.js";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import SignIn from "./routes/Signing/SignIn";
import SignUp from "./routes/Signing/SignUp";
import {AuthProvider} from './routes/Signing/AuthContext';
import LogOut from "./routes/Signing/LogOut";

const router = createBrowserRouter([{
    path: "/", element: <Root/>, errorElement: <ErrorPage/>, children: [{
        path: "/", element: <FilterSection/>
    }, {
        path: "faq", element: <FAQSection/>
    }, {
        path: "user-account", element: <UserAccount/>
    }, {
        path: "sign-in", element: <SignIn/>
    }, {
        path: "sign-up", element: <SignUp/>
    }, {
        path: "logout", element: <LogOut/>
    }]
}]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </ThemeProvider>
</React.StrictMode>);
