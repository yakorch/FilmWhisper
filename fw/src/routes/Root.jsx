import {Header} from "./Header/Header";
import {Outlet} from "react-router-dom";
import {Footer} from "./Footer/Footer";
import {Container} from "@mui/material";

export function Root() {
    return (
        <Container>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </Container>
    )
}