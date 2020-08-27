import React, { Component } from "react";
import "./Button.css";

export default class Button extends Component {
    
    get model() { return this.props.model; }
    get value() { return "+"; }
    get style() { return "button"; }
    get isAutoTick() { return this.props.isAutoTick; }

    onClick( event ) {
        if ( !this.props || !this.props.onClick ) return;
        this.props.onClick( event );
    }

    onDown( event ) {
        this._tickerStart();
        if ( !this.props || !this.props.onDown ) return;
        this.props.onDown( event );
    }

    onUp( event ) {
        this._tickerClear();
        if ( !this.props || !this.props.onUp ) return;
        this.props.onUp( event );
    }

    onOver( event ) {
        if ( !this.props || !this.props.onOver ) return;
        this.props.onOver( event );
    }

    onOut( event ) {
        this._tickerClear();
        if ( !this.props || !this.props.onOut ) return;
        this.props.onOut( event );
    }


    _tickerStart() {
        if ( !this.isAutoTick ) return;
        if ( this.tickerTimeoutIndex ) return;
        this._tickerClear();
        this._tickerStartTimeout();
    }
    _tickerStop() {
        if ( !this.tickerTimeoutIndex ) return;
        clearTimeout( this.tickerTimeoutIndex );
        this.tickerTimeoutIndex = 0;
    }
    _tickerClear() {
        this._tickerStop();
        this.tickerTime = 1000;
        this.tickerTimeoutIndex = 0;
    }
    _tickerNextTime() {
        this.tickerTime /= 1.75;
        if ( this.tickerTime < 10 ) this.tickerTime = 10;
    }
    _tickerStartTimeout() {
        this.tickerTimeoutIndex = setTimeout( () => {
            this.onClick();
            this._tickerNextTime();
            this._tickerStartTimeout();
        }, this.tickerTime );
    }


    render() {
        return (
            <a href="#" className={ this.style }
                onClick={ this.onClick.bind( this ) }
                onMouseDown={ this.onDown.bind( this ) }
                onMouseUp={ this.onUp.bind( this ) }
                onMouseOver={ this.onOver.bind( this ) }
                onMouseOut={ this.onOut.bind( this ) }>
                    { this.value }
            </a>
        );
    }

}