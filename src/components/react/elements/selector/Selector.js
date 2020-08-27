import React, { Component } from "react";
import "./Selector.css";
import SelectorButtonDirection from "./constants/SelectorButtonDirection";
import TextField from "../noactive/text/TextField";
import SelectorController from "./SelectorController";
import SelectorButton from "./buttons/SelectorButton";
import SelectorEvent from "./events/SelectorEvent";
import SelectorView from "./SelectorView";
import SelectorModel from "./SelectorModel";

export default class Selector extends Component {

    constructor( props ) {
        super( props );

        this.initSelector();
    }

    get eventDispatcher() { return this.props.eventDispatcher; }

    componentDidMount() {
        this.subscribe();
    }
    componentWillUnmount() {
        this.unsubscribe();
    }


    //
    // INIT
    //
    initSelector() {
        this.view = new SelectorView();
        this.model = new SelectorModel( this.props.modelData );
        this.controller = new SelectorController( this.model, this.view );
    }


    //
    // SUBSCRIBE / UNSUBSCRIBE
    //
    subscribe() {
        if ( !this.eventDispatcher ) return;
        this.eventDispatcher.addEventListener( SelectorEvent.CHANGE_VALUE, this.onSelectorChange, this );
    }
    unsubscribe() {
        if ( !this.eventDispatcher ) return;
        this.eventDispatcher.removeEventListener( SelectorEvent.CHANGE_VALUE, this.onSelectorChange, this );
    }

    onSelectorChange( event ) {
        this.setState( { selectorValue: this.model.value } );
    }

    getSelectorRender() {
        const { title, value } = this.model;
        const onDecrease = this.controller.onDecrease.bind( this.controller );
        const onIncrease = this.controller.onIncrease.bind( this.controller );

        return this.view.getSelectorRender( title, value, onDecrease, onIncrease );
    }

    render() {
        return this.getSelectorRender();
    }

}