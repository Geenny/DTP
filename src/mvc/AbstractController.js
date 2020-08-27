import AbstarctView from "./AbstarctView";

export default class AbstractController {

    /**
     * Abstarct controller class
     * @param { AbstarctModel } model 
     * @param { AbstarctView } view 
     */
    constructor( model, view ) {

        this.model = model;
        this.view = view;

    }

    /**
     * Init method as interface
     */
    init() { }

    /**
     * Update view
     */
    update() {
        if ( !( this.view instanceof AbstarctView ) ) return;
        this.view.update();
    }

}