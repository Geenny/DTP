import React from "react";
import "./Selector.css";
import AbstractView from "../../../../mvc/AbstarctView";
import SelectorButton from "./buttons/SelectorButton";
import SelectorButtonDirection from "./constants/SelectorButtonDirection";

export default class SelectorView extends AbstractView {

    getSelectorRender( title, value, onDecrease, onIncrease ) {
        return (
            <div className="selector-div">
                <div className="selector">
                    <div className="selector-title">{ title }</div>
                    <div className="selector-list">
                        <SelectorButton
                            id="1"
                            isAutoTick="true"
                            type={ SelectorButtonDirection.LEFT }
                            onClick={ onDecrease } />
                        <SelectorButton
                            id="2"
                            isAutoTick="true"
                            type={ SelectorButtonDirection.RIGHT }
                            onClick={ onIncrease } />
                        <div className="selector-text">{ value }</div>
                    </div>
                </div>
            </div>
        );
    }

}