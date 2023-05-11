import "./navigation.css";
import {Link} from "react-router-dom";

export const NavigationLink = (props) => {
    const {text, url} = props.appPage;
    return (

        <Link className="link-less" to={url}>
            <div className="navigation-link">
                {text}
            </div>
        </Link>
    )
}