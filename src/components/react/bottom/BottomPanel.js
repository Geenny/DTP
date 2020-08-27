import React, { Component } from "react";
import "./BottomPanel.css";
import Selector from "../elements/selector/Selector";
import { SELECTOR_SHAPE_COUNT_DATA, SELECTOR_GRAVITY_DATA } from "../../../config/CONFIG";

export default class BottomPanel extends Component {
    
    get eventDispatcher() { return this.props.eventDispatcher; }

    getShapeCountData() {
        const { eventDispatcher } = this;
        return { ...SELECTOR_SHAPE_COUNT_DATA, eventDispatcher };
    }
    getGravityData() {
        const { eventDispatcher } = this;
        return { ...SELECTOR_GRAVITY_DATA, eventDispatcher };
    }

    render() {
        return (
            <div className="bottom-panel-div">
                <div className="bottom-panel">
                    <Selector id="1" modelData={ this.getShapeCountData() } eventDispatcher={ this.eventDispatcher } />
                    <Selector id="2" modelData={ this.getGravityData() } eventDispatcher={ this.eventDispatcher } />
                </div>
            </div>
        );
    }

}