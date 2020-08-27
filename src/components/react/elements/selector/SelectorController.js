import SelectorEvent from "./events/SelectorEvent";
import Event from "../../../../observer/Event";
import AbstractController from "../../../../mvc/AbstractController";

export default class SelectorController extends AbstractController {

    get eventDispatcher() { return this.model.eventDispatcher; }

    get value() { return this.model.value; }
    set value( value ) {
        if ( value < this.valueMin ) return;
        if ( value > this.valueMax ) return;
        this.model.value = value;
        this.dispath( new SelectorEvent( SelectorEvent.CHANGE_VALUE, this.model ) );
    }

    get valueMin() { return this.model.valueMin; }
    get valueMax() { return this.model.valueMax; }
    get valueStep() { return this.model.valueStep; }

    onIncrease( event ) {
        this.value = this.value + this.valueStep;
    }

    onDecrease( event ) {
        this.value = this.value - this.valueStep;
    }

    dispath( eventInstanse ) {
        if ( !( eventInstanse instanceof Event ) ) return;
        if ( !this.eventDispatcher ) return;
        this.eventDispatcher.dispatchEvent( eventInstanse );
    }

}