import AbstractModel from "../../../../mvc/AbstractModel";

const SHAPE_DATA = {
    eventDispatcher: null,
    position: 0,
    bounds: null,
    parent: null,
    instance: null,
    class: null,            // Circle, Ellipse, Poligon, RoundedRectangle
    shape: null             // Circle, Ellipse, Poligon, RoundedRectangle
};

export default class ShapeModel extends AbstractModel {

    constructor( data = SHAPE_DATA ) {

        super( data );

    }
    
}