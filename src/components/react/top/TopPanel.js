import React, { Component } from "react";
import "./TopPanel.css";
import TextField from "../elements/noactive/text/TextField";
import ShapeDropperEvent from "../../canvas/shapeDroper/events/ShapeDropperEvent";

export default class TopPanel extends Component {
    
    get eventDispatcher() { return this.props.eventDispatcher; }
    get shapesCount() { return this._shapesCount || 0; }
    get shapesSquare() { return this._shapesSquare || 0; }

    componentDidMount() {
        this.subscribe();
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    //
    // SUBSCRIBE / UNSUBSCRIBE
    //
    subscribe() {
        if ( !this.eventDispatcher ) return;
        if ( this.isSubscribe ) return;
        this.isSubscribe = true;
        this.eventDispatcher.addEventListener( ShapeDropperEvent.SHAPES_COUNT, this.onShapeCount, this );
        this.eventDispatcher.addEventListener( ShapeDropperEvent.SHAPES_SQUARE, this.onShapeSquare, this );
    }
    unsubscribe() {
        this.eventDispatcher.removeEventListener( ShapeDropperEvent.SHAPES_COUNT, this.onShapeCount, this );
        this.eventDispatcher.removeEventListener( ShapeDropperEvent.SHAPES_SQUARE, this.onShapeSquare, this );
    }
    onShapeCount( event ) {
        const { count } = event.data;
        this._shapesCount = count;
        this.setState( { } );
    }
    onShapeSquare( event ) {
        const { square } = event.data;
        this._shapesSquare = square;
        this.setState( { } );
    }

    render() {
        return (
            <div className="top-panel-div">
                <div className="top-panel">
                    <TextField id="1" title="Количество фигур на поле" value={ this.shapesCount } />
                    <TextField id="2" title="Занимаемая ими площадь" prefix="пикселей" value={ this.shapesSquare } />
                </div>
            </div>
        );
    }

}