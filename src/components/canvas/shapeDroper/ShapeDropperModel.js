import AbstractModel from "../../../mvc/AbstractModel";

const SHAPE_DROPPER_DEFAULT_DATA = {
    eventDispatcher: null,
    container: null,
    shapeCount: 2,
    gravity: 10
};

export default class ShapeDropperModel extends AbstractModel {

    constructor( data = SHAPE_DROPPER_DEFAULT_DATA ) {

        super( data );

    }
    
}