import {MultipleOptionsList} from "./MultipleOptionsList";

export function FilterSection() {
    return (
        <>
            <h2>What genres do you prefer?</h2>
            <MultipleOptionsList options={["Comedy", "Horror", "Action", "Thriller", "Drama"]} />
        </>
    )
}