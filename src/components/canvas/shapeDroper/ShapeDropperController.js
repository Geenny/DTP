import AbstractController from "../../../mvc/AbstractController";
import SelectorEvent from "../../react/elements/selector/events/SelectorEvent";
import {
    SELECTOR_SHAPE_COUNT_TYPE,
    SELECTOR_GRAVITY_TYPE,
    SELECTOR_SHAPE_COUNT_VALUE_DEFAULT,
    SELECTOR_GRAVITY_VALUE_DEFAULT
} from "../../../config/CONFIG";
import ResizeEvent from "../../events/ResizeEvent";
import { Polygon, Circle, Ellipse, RoundedRectangle, Point, Rectangle } from "pixi.js";
import ShapeModel from "./shape/ShapeModel";
import ShapeDropperView from "./ShapeDropperView";
import ShapeController from "./shape/ShapeContoller";
import ShapeStruct from "./shape/ShapeStruct";
import ShapeView from "./shape/ShapeView";
import ShapeEvent from "./shape/events/ShapeEvent";
import ShapeDropperEvent from "./events/ShapeDropperEvent";

const shapes = [ Polygon, Circle, Ellipse, RoundedRectangle ];
const POINTERDOWN = "pointerdown";

export default class ShapeDropperController extends AbstractController {

    get eventDispatcher() { return this.model.eventDispatcher; }

    get width() { return this.model.width || 100; }
    get height() { return this.model.height || 100; }
    get container() { return this.model.container; }

    get shapesTimeout() { return 1000 / this.shapeCount; }

    init() {
        this.subscribe();
        this.initVars();
        this.initHitArea();
        this.initInteractive();
        this.initDropper();
        this.initShapeGenerator();
    }
    initVars() {
        this.list = [ ];
        this.shapeCount = SELECTOR_SHAPE_COUNT_VALUE_DEFAULT;
        this.gravity = SELECTOR_GRAVITY_VALUE_DEFAULT;
    }
    initHitArea() {
        this.updateHitArea();
    }
    initDropper() {
        this._dropperStart();
    }
    initShapeGenerator() {
        this._shapeGeneratorUpdate();
    }


    //
    // INTERACTIVE
    //
    initInteractive() {
        this.container.interactive = true;
        this.onClick = this.onClick.bind( this );
        this.container.on( POINTERDOWN, this.onClick );
    }
    updateHitArea() {
        this.hitArea = new Rectangle( 0, 0, this.width, this.height );
        this.container.hitArea = this.hitArea;
    }
    onClick( event ) {
        const point = event.data.global;
        if ( this.shapeStructForRemove ) return;
        this._shapeCreateByClick( point );
    }

    //
    // SUBSCRIBE / UNSUBSCRIBE
    //
    subscribe() {
        if ( this.isSubscribe ) return;
        this.isSubscribe = true;
        this.eventDispatcher.addEventListener( SelectorEvent.CHANGE_VALUE, this.onSelectorChange, this );
        this.eventDispatcher.addEventListener( ResizeEvent.CHANGE, this.onResize, this );
        this.eventDispatcher.addEventListener( ShapeEvent.CLICK, this.onShapeClick, this );
    }
    unsubscribe() {
        if ( !this.isSubscribe ) return;
        this.eventDispatcher.removeEventListener( SelectorEvent.CHANGE_VALUE, this.onSelectorChange, this );
        this.eventDispatcher.removeEventListener( ResizeEvent.CHANGE, this.onResize, this );
        this.eventDispatcher.removeEventListener( ShapeEvent.CLICK, this.onShapeClick, this );
    }
    onSelectorChange( event ) {
        this.selectorChangeByModel( event.model );
    }
    onResize( event ) {
        this.model.width = event.width;
        this.model.height = event.height;
        this.updateHitArea();
    }
    onShapeClick( event ) {
        this.shapeRemoveByModel( event.model );
    }


    selectorChangeByModel( model ) {
        switch( model.type ) {
            case SELECTOR_SHAPE_COUNT_TYPE:
                this.shapeCount = model.value;
                this._shapeGeneratorUpdate();
                break;
            case SELECTOR_GRAVITY_TYPE:
                this.gravity = model.value;
                break;
            default:
        }
    }


    //
    // SHAPE GENERATOR
    //
    _shapeGeneratorUpdate() {
        this._shapeGeneratorClear();
        this._shapeGeneratorStart();
    }
    _shapeGeneratorClear() {
        clearInterval( this._shapeGeneratorTimeoutIndex );
        this._shapeGeneratorTimeoutIndex = 0;
    }
    _shapeGeneratorStart() {
        this._shapeGeneratorTimeoutIndex = setInterval( () => {
            this._shapeCreateRandom();
        }, this.shapesTimeout );
    }


    //
    // SHAPE
    //
    shapeRemoveByModel( model ) {
        if ( this.shapeStructForRemove ) return;
        this.shapeStructForRemove = this._shapeStructByModelGet( model );
        // this._shapeClear( shapeStruct );
    }
    _shapeRemovePrepared() {
        if ( !this.shapeStructForRemove ) return;
        this._shapeClear( this.shapeStructForRemove );
        this.shapeStructForRemove = null;
    }
    _shapeCreateRandom() {
        const widthPart = Math.random();
        const shapeData = this._shapeDataRandomGet();
        return this._shapeCreate( { widthPart, shapeData } );
    }
    _shapeCreateByClick( point ) {
        const shapeStruct = this._shapeCreateRandom();
        const bounds = shapeStruct.model.bounds;
        shapeStruct.model.instance.position.set( point.x - bounds.width * 0.5, point.y - bounds.height * 0.5 );
    }
    _shapeDataRandomGet() {
        const index = Math.floor( shapes.length * Math.random() );
        return this._shapeDataRandomByIndexGet( index );
    }
    _shapeDataRandomByIndexGet( index ) {
        switch( index ) {
            case 1:
                return this._shapeDataCircleRandomGet();
            case 2:
                return this._shapeDataEllipseRandomGet();
            case 3:
                return this._shapeDataRoundedRectangleRandomGet();
            default:
                return this._shapeDataPolygonRandomGet();
        }
    }
    _shapeDataCircleRandomGet() {
        const circleRadius = 10 + Math.floor( Math.random() * 90 );
        const bounds = new Rectangle( 0, 0, circleRadius * 2, circleRadius * 2 );
        return { class: Circle, bounds, x: circleRadius, y: circleRadius, radius: circleRadius };
    }
    _shapeDataEllipseRandomGet() {
        const halfWidth = 10 + Math.floor( Math.random() * 90 );
        const halfHeight = 10 + Math.floor( Math.random() * 90 );
        const bounds = new Rectangle( 0, 0, halfWidth * 2, halfHeight * 2 );
        return { class: Ellipse, bounds, x: halfWidth, y: halfHeight, halfWidth, halfHeight };
    }
    _shapeDataRoundedRectangleRandomGet() {
        const radius = Math.floor( Math.random() * 10 );
        const width = 10 + Math.floor( Math.random() * 190 );
        const height = 10 + Math.floor( Math.random() * 190 );
        const bounds = new Rectangle( 0, 0, width, height );
        return { class: RoundedRectangle, bounds, x: 0, y: 0, width, height, radius };
    }
    _shapeDataPolygonRandomGet() {
        const points = [];
        const polygonRaduisWidth = 10 + Math.floor( Math.random() * 90 );
        const polygonRaduisHeight = 10 + Math.floor( Math.random() * 90 );
        const pointCount = 3 + Math.floor( Math.random() * 4 );
        const bounds = new Rectangle( 0, 0, polygonRaduisWidth * 2, polygonRaduisHeight * 2 );

        for ( let i = 0; i < pointCount; i++ ) {
            const x = polygonRaduisWidth + Math.floor( polygonRaduisWidth * Math.sin( Math.PI * 2 * i / pointCount ) );
            const y = polygonRaduisHeight + Math.floor( polygonRaduisHeight * Math.cos( Math.PI * 2 * i / pointCount ) );
            points.push( new Point( x, y ) );
        }

        return { class: Polygon, bounds, points };
    }
    _shapeCreate( data ) {
        const { eventDispatcher, container } = this;
        const { widthPart, shapeData } = data;

        const shape = this._shapeCreateByData( shapeData );
        const position = Math.floor( ( this.width - shapeData.bounds.width ) * widthPart );

        const shapeModelData = {
            eventDispatcher,
            position,
            bounds: shapeData.bounds,
            parent: container,
            class: shapeData.class,
            shape
        };

        const model = new ShapeModel( shapeModelData );
        const view = new ShapeView();
        const controller = new ShapeController( model, view );
        controller.init();

        const shapeStruct = new ShapeStruct( controller, model, view );
        this._shapeAddToList( shapeStruct );
        this._squareUpdate();

        return shapeStruct;
    }
    _shapeClear( shapeStruct ) {
        if ( !shapeStruct ) return;

        const index = this.list.indexOf( shapeStruct );
        if ( index < 0 ) return;

        shapeStruct.controller.removeShapeViewChild();

        this._shapeRemoveFromList( index );
        this._squareUpdate();
    }
    _shapeAddToList( shapeStruct ) {
        this.list.push( shapeStruct );
        this.dispatch( new ShapeDropperEvent( ShapeDropperEvent.SHAPES_COUNT, { count: this.list.length } ) );
    }
    _shapeRemoveFromList( index ) {
        this.list.splice( index, 1 );
        this.dispatch( new ShapeDropperEvent( ShapeDropperEvent.SHAPES_COUNT, { count: this.list.length } ) );
    }
    _shapeCreateByData( shapeData ) {
        switch( shapeData.class ) {
            case Circle:
                return new Circle( shapeData.x, shapeData.y, shapeData.radius );
            case Ellipse:
                return new Ellipse( shapeData.x, shapeData.y, shapeData.halfWidth, shapeData.halfHeight );
            case RoundedRectangle:
                return new RoundedRectangle( shapeData.x, shapeData.y, shapeData.width, shapeData.height, shapeData.radius );
            case Polygon:
                return new Polygon( shapeData.points );
            default:
                return new Polygon( [ new Point( 0, 0 ), new Point( 10, 0 ), new Point( 10, 10 ), new Point( 0, 10 ) ] );
        }
    }
    _shapeStructByModelGet( shapeModel ) {
        for ( let i = 0; i < this.list.length; i++ ) {
            const shapeStruct = this.list[ i ];
            if ( shapeStruct.model === shapeModel )
                return shapeStruct;
        }
        return null;
    }

    _shapeGravityStep( shapeStruct ) {
        if ( !shapeStruct ) return;
        shapeStruct.controller.gravityUpdate( this.gravity * 0.1 );
    }
    _shapeKillTest( shapeStruct ) {
        const instance = shapeStruct.model.instance;
        if ( instance.y < this.height ) return;
        this._shapeClear( shapeStruct );
    }


    //
    // SQUARE
    //
    _squareUpdate() {
        let square = 0;
        for ( let i = 0; i < this.list.length; i++ ) {
            const shapeStruct = this.list[ i ];
            const bounds = shapeStruct.model.bounds;
            square += bounds.width * bounds.height;
        }
        this.dispatch( new ShapeDropperEvent( ShapeDropperEvent.SHAPES_SQUARE, { square } ) );
    }



    //
    // DROPPER
    //
    _dropperStart() {
        this._dropperClear();
        this._dropperTimeout = setInterval( () => {
            this._shapeRemovePrepared();
            for ( let i = this.list.length - 1; i > -1; i-- ) {
                const shapeStruct = this.list[ i ];
                this._shapeGravityStep( shapeStruct );
                this._shapeKillTest( shapeStruct );
            }
        }, 33 );
    }
    _dropperClear() {
        clearInterval( this._dropperTimeout );
        this._dropperTimeout = 0;
    }


    //
    // DISPATCH
    //
    dispatch( eventInstance ) {
        if ( !this.eventDispatcher ) return;
        this.eventDispatcher.dispatchEvent( eventInstance );
    }

}