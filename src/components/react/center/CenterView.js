import React, { Component } from "react";
import PixiController from "../../canvas/pixiView/PixiController";
import PixiModel from "../../canvas/pixiView/PixiModel";
import PixiView from "../../canvas/pixiView/PixiView";
import ShapeDropperController from "../../canvas/shapeDroper/ShapeDropperController";
import ShapeDropperModel from "../../canvas/shapeDroper/ShapeDropperModel";
import ShapeDropperView from "../../canvas/shapeDroper/ShapeDropperView";

export default class CenterView extends Component {
    
    get eventDispatcher() { return this.props.eventDispatcher; }

    _updatePixiContent( HTMLElement ) {
        this.HTMLElement = HTMLElement;
        if ( this.HTMLElement && this.HTMLElement.children.length <= 0 ) {
           this._initPixi();
           this._initShapeDropper();
        }
    };
    _initPixi() {
        const { HTMLElement, eventDispatcher } = this;

        const model = new PixiModel( { HTMLElement, eventDispatcher } );
        const view = new PixiView();
        const controller = new PixiController( model, view );
        controller.init();

        this.pixiController = controller;
    }
    _initShapeDropper() {
        const { eventDispatcher } = this;
        const { container, width, height } = this.pixiController;

        const model = new ShapeDropperModel( { width, height, container, eventDispatcher } );
        const view = new ShapeDropperView();
        const controller = new ShapeDropperController( model, view );
        controller.init();
    }



    render() {
        return (
            <div className="center-view-div">
                <div className="center-view" ref={ this._updatePixiContent.bind( this ) }></div>
            </div>
        );
    }

}