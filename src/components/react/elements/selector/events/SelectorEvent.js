import Event from "../../../../../observer/Event";

export default class SelectorEvent extends Event {

    constructor( type, model ) {

        super( type );

        this.model = model;

    }

}

SelectorEvent.CHANGE_VALUE = "selectorChangeValue";