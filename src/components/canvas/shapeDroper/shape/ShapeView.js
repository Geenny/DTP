import AbstractView from "../../../../mvc/AbstarctView";
import { Container, Graphics } from "pixi.js";

export default class ShapeView extends AbstractView {

    getShapeView( shape, lineColor, fillColor ) {

        const container = new Container();
        const graphics = new Graphics();

        graphics.lineStyle( 2, lineColor );
        graphics.beginFill( fillColor, 1 );
        graphics.drawShape( shape );
        graphics.endFill();

        container.addChild( graphics );
        
        return container;
    }

    updateShapeView( shapeView, position, bounds ) {
        shapeView.x = position;
        shapeView.y = -bounds.height;
    }

}