import React from "react";
import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export function FAQSection() {
    return (
        <MDBAccordion alwaysOpen initialActive={1} style={{ margin: "50px 0 50px 0" }}>
            <MDBAccordionItem collapseId={1} headerTitle="Do you like Film Whisper?">
                <strong>Hell yeah.</strong>
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={2} headerTitle="Do you like Film Whisper?">
                <strong>Hell yeah.</strong>
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={3} headerTitle="Do you like Film Whisper?">
                <strong>Hell yeah.</strong>
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={4} headerTitle="Do you like Film Whisper?">
                <strong>Hell yeah.</strong>
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={5} headerTitle="Do you like Film Whisper?">
                <strong>Hell yeah.</strong>
            </MDBAccordionItem>
        </MDBAccordion>
    )
}