import AbstractModel from "../../../../mvc/AbstractModel";

export const DEFAULT_MODEL_OBJECT = {
    id: 0,
    type: "selector",
    title: "Selector",
    value: 2,
    valueMin: 1,
    valueMax: 10,
    valueStep: 1
};

export default class SelectorModel extends AbstractModel {

    constructor( data = DEFAULT_MODEL_OBJECT ) {

        super( data );
        
    }

}