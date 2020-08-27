export default class AbstractModel {

    /**
     * Abstarct model class
     * @param { Object } data Source data
     */
    constructor( data = { } ) {

        this.data = data;

        this.parse( data );

    }

    /**
     * Clone source data @data to @AbstarctView
     * @param { Object } data Source data
     */
    parse( data ) {

        if ( !data ) return;

        for ( const key in data ) {
            this[ key ] = data[ key ];
        }

    } 

}