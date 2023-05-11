import {BinaryOptionElement} from "./BinaryOptionElement";

export function MultipleOptionsList(props) {
    return (<ul>
        {props.options.map((option, index) => (<BinaryOptionElement key={index} text={option}/>))}
    </ul>);
}