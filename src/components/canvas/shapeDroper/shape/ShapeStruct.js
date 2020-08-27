import Struct from "../../../../mvc/Struct";

export default class ShapeStruct extends Struct {

    /**
     * Shape structure object
     * @param { ShapeController } controller Shape controller
     * @param { ShapeModel } model Shape model
     * @param { ShapeView } view Shape view
     */
    constructor( controller, model, view ) {
        super( controller, model, view );
    }

}