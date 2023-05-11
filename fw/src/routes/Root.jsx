import {Header} from "./Header/Header";
import {Outlet} from "react-router-dom";
import {Footer} from "./Footer/Footer";

export function Root() {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}