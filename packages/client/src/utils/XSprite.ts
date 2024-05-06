import Phaser from 'phaser';
import { ScaleFlow } from './ScaleFlow';

export class XSprite extends Phaser.GameObjects.Sprite
{
    private _x: string | number;
    private _y: string | number;

    constructor (scene: Phaser.Scene, x: number | string, y: number | string, texture: string, frame?: string|number)
    {
        super(scene, 0, 0, texture, frame);

        this.setPosition(x, y);
    }

    onResize ()
    {
        this.setPosition(this._x, this._y);
    }

    setX (x: number | string): this
    {
        this._x = x;

        super.setX(ScaleFlow.getX(x));

        return this;
    }

    setY (y: number | string): this
    {
        this._y = y;

        super.setY(ScaleFlow.getY(y));

        return this;
    }

    setPosition (x: number | string, y: number | string): this
    {
        this._x = x;
        this._y = y;
        
        super.setPosition(ScaleFlow.getX(x), ScaleFlow.getY(y));

        return this;
    }

    /**
     * The x position of this Game Object.
     * Can be set as a string or a number.
     */
    set X (value: number | string)
    {
        this.setX(value);
    }

    /**
     * The y position of this Game Object.
     * Can be set as a string or a number.
     */
    set Y (value: number | string)
    {
        this.setY(value);
    }

    get X (): number
    {
        return this.x;
    }

    get Y (): number
    {
        return this.y;
    }

    preDestroy ()
    {
        ScaleFlow.removeSprite(this);

        this.anims.destroy();

        this.anims = undefined;
    }
}
