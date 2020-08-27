import AbstractController from "../../../../mvc/AbstractController";
import ShapeEvent from "./events/ShapeEvent";

const POINTERDOWN = "pointerdown";

export default class ShapeController extends AbstractController {

    get eventDispatcher() { return this.model.eventDispatcher; }

    get parent() { return this.model.parent; }
    get shape() { return this.model.shape; }
    get bounds() { return this.model.bounds; }
    get position() { return this.model.position; }

    init() {
        this.initShape();
        this.initInteractive();
        this.subscribe();
    }

    initShape() {
        const lineColor = Math.floor( Math.random() * 0xffffff );
        const fillColor = Math.floor( Math.random() * 0xffffff );
        const shapeView = this.view.getShapeView( this.shape, lineColor, fillColor );

        shapeView.x = this.position;
        shapeView.y = -this.bounds.height;

        this.addShapeViewChild( shapeView );

        this.model.instance = shapeView;
        this.shapeView = shapeView;
    }
    initInteractive() {
        const { shapeView } = this;

        shapeView.interactive = true;
        shapeView.hitArea = this.shape;
    }


    //
    // SUBSCRIBE / UNSUBSCRIBE
    //
    subscribe() {
        const { shapeView } = this;
        this.onClick = this.onClick.bind( this );
        shapeView.on( POINTERDOWN, this.onClick );
    }
    unsubscribe() {
        const { shapeView } = this;
        shapeView.off( POINTERDOWN, this.onClick );
    }
    onClick( event ) {
        this.dispatch( new ShapeEvent( ShapeEvent.CLICK, this.model ) );
    }


    //
    // ADD / REMOVE CHILD
    //
    addShapeViewChild( child ) {
        this.parent.addChild( child );
    }
    removeShapeViewChild() {
        this.parent.removeChild( this.shapeView );
    }


    //
    // GRAVITY
    //
    gravityUpdate( gravity ) {
        this.shapeView.y += gravity;
    }


    //
    // DISPATCH
    //
    dispatch( eventInstance ) {
        if ( !this.eventDispatcher ) return;
        this.eventDispatcher.dispatchEvent( eventInstance );
    }


    //
    // DESTROY
    //
    destroy() {
        this.unsubscribe();
        this.removeShapeViewChild();
    }
    
}