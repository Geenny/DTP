import { PIXI_APPLICATION_OPTIONS } from "../../../config/CONFIG";
import { Application, Container } from "pixi.js";
import AbstractView from "../../../mvc/AbstarctView";

export default class PixiView extends AbstractView {

    get pixi() { return this._pixi; }
    get stage() { return this.pixi.stage; }
    get container() { return this._container;}

    initPIXI( HTMLElement ) {
        this._pixi = new Application( PIXI_APPLICATION_OPTIONS );
        HTMLElement.appendChild( this.pixi.view );
        return this.pixi;
    }

    initShapesContainer() {
        const container = new Container();
        this.pixi.stage.addChild( container );
        this._container = container;
        return container;
    }

}