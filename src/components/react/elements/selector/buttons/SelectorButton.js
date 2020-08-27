import React from "react";
import Button from "../../interactive/button/Button";
import "./SelectorButton.css";
import SelectorButtonDirection from "../constants/SelectorButtonDirection";

export default class SelectorButton extends Button {

    get type() { return this.props.type || SelectorButtonDirection.LEFT; }
    get style() { return this.getSelectorButtonClassName(); }
    get value() { return this.getSelectorButtonValue(); }

    getSelectorButtonClassName() {
        switch( this.type ) {
            case SelectorButtonDirection.RIGHT:
                return "selector-button selector-button-right";
            default:
                return "selector-button selector-button-left";
        }
    }

    getSelectorButtonValue() {
        switch( this.type ) {
            case SelectorButtonDirection.RIGHT:
                return "+";
            default:
                return "-";
        }
    }

}