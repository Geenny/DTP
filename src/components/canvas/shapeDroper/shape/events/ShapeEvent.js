import Event from "../../../../../observer/Event";

export default class ShapeEvent extends Event {

    constructor( type, model ) {

        super( type );

        this.model = model;

    }

}

ShapeEvent.DOWN = "shapeDown";
ShapeEvent.CLICK = "shapeClick";