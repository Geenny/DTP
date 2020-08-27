import Event from "../../../../observer/Event";

export default class ShapeDropperEvent extends Event {

    constructor( type, data ) {

        super( type );

        this.data = data;

    }

}

ShapeDropperEvent.SHAPES_COUNT = "shapesCount";
ShapeDropperEvent.SHAPES_SQUARE = "shapesSquare";