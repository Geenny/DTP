export default class ButtonModel {

    /**
     * Button model
     * @param { Object } data Button model data 
     */
    constructor( data = { onClick: null } ) {

        this.onClick = data.onClick;

    }

}