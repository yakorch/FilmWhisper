import {useState} from "react";
import "./genres.css";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faPlus} from '@fortawesome/free-solid-svg-icons'

export function BinaryOptionElement(props) {
    const [isSelected, setIsSelected] = useState(false);
    const handleClick = () => {
        setIsSelected(!isSelected);
    };

    const buttonClassName = isSelected ? "selected" : "not-selected";

    return (
        <>
            <button className={`binary-button ${buttonClassName}`} onClick={handleClick}>
                <FontAwesomeIcon icon={isSelected ? faCheck : faPlus}/>
                <span>{props.text}</span>
            </button>
        </>
    )
}