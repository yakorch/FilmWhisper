import "./navigation.css";
import {NavigationLink} from "./NavigationLink";


export const NavigationBar = () => {
    const appPages = [
        {text: "Whisper!", url: "/"},
        {text: "FAQ", url: "faq"},
        {text: "User Account", url: "user-account"}
    ]
    return (
        <>
            <ul className="navigation-bar">
                {
                    appPages.map((appPage, index) =>
                        <NavigationLink appPage={appPage} key={index}/>)
                }
            </ul>
        </>
    )
}