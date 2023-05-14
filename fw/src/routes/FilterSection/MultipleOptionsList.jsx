import {BinaryOptionElement} from "./BinaryOptionElement";

export function MultipleOptionsList(props) {
    return (<div>
        {props.options.map((option, index) => (<BinaryOptionElement key={index} index={index} text={option} changeOptionState={props.changeOptionState}/>))}
    </div>);
}