import Event from "../../../observer/Event";
import AbstractController from "../../../mvc/AbstractController";
import ResizeEvent from "../../events/ResizeEvent";

export default class PixiController extends AbstractController {

    get width() { return this.model.width; }
    get height() { return this.model.height; }

    get HTMLElement() { return this.model.HTMLElement; }
    get eventDispatcher() { return this.model.eventDispatcher; }

    get pixi() { return this.model.pixi; }
    get container() { return this.model.container; }

    init() {
        this._initMethodsContext();
        this._initPIXI();
        this._initShapesContainer();
        this.onResize();
    }

    _initMethodsContext() {
        this.onResize = this.onResize.bind( this );
        window.addEventListener( Event.RESIZE, this.onResize );
    }

    _initPIXI() {
        this.model.pixi = this.view.initPIXI( this.HTMLElement );
    }

    _initShapesContainer() {
        this.model.container = this.view.initShapesContainer();
    }

    //
    // RESIZE
    //

    onResize( event ) {
        this.model.width = window.innerWidth;
        this.model.height = window.innerHeight - 164;
        this.pixi.renderer.autoResize = true;
        this.pixi.renderer.resize( this.width, this.height );
        this.dispatch( new ResizeEvent( ResizeEvent.CHANGE, this.width, this.height ) );
    }


    //
    // DISPATCH
    //
    dispatch( eventInstanse ) {
        if ( !this.eventDispatcher ) return;
        this.eventDispatcher.dispatchEvent( eventInstanse );
    }

}