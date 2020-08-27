import React, { Component } from "react";
import TopPanel from "./top/TopPanel";
import BottomPanel from "./bottom/BottomPanel"
import CenterView from "./center/CenterView";

export default class Site extends Component {

    get eventDispatcher() { return this.props.eventDispatcher; }

    render() {
        return (
            <div className="site">
                <TopPanel eventDispatcher={ this.eventDispatcher } />
                <CenterView eventDispatcher={ this.eventDispatcher } />
                <BottomPanel eventDispatcher={ this.eventDispatcher } />
            </div>
        );
    }

}