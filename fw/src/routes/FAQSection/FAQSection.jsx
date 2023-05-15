import React from "react";
import {MDBAccordion, MDBAccordionItem} from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export function FAQSection() {
    const questionsAndAnswers = [
        {question: "Do you like Film Whisper?", answer: "Hell yeah."},
        {question: "What mathematical operation is performed on genres?", answer: "By default - Intersection. We are working on creating a Union too."},
        {question: "What is the limit of the recommended movies?", answer: "10! (hehe)"},
        {question: "Why do I need a User account?", answer: "To save your favourite movies!"},
        {question: "Can I add imaginary actors to the Actors filter?", answer: "Yes, but you won't get any results ;)"},
    ];

    return (


        <MDBAccordion alwaysOpen initialActive={1} style={{margin: "50px 0 50px 0"}}>
            {
                questionsAndAnswers.map(({question, answer}, index) =>

                    <MDBAccordionItem collapseId={index + 1} key={index} headerTitle={question}>
                        <strong>{answer}</strong>
                    </MDBAccordionItem>)
            }
        </MDBAccordion>
    )
}