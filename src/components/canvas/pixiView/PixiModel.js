import AbstractModel from "../../../mvc/AbstractModel";

const PIXI_MODEL_DEFAULT_DATA = {
    width: 0,
    height: 0,
    HTMLElement: null,
    eventDispatcher: null,
    pixi: null,             // PIXI.Application
    container: null         // PIXI.Container for shapes
};

export default class PixiModel extends AbstractModel {

    constructor( data = PIXI_MODEL_DEFAULT_DATA ) {

        super( data );

    }

}