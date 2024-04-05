import { Scene } from 'phaser';
import { Room, Client } from "colyseus.js";

export const BACKEND_URL = (window.location.href.indexOf("localhost") === -1)
    ? `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}${(window.location.port && `:${window.location.port}`)}`
    : "ws://localhost:2567"

export const BACKEND_HTTP_URL = BACKEND_URL.replace("ws", "http");


export class Game extends Scene
{
    room: Room;
    
    constructor ()
    {
        super('Game');
    }

    async create ()
    {
        await this.connect();

        this.cameras.main.setBackgroundColor(0x00ff00);

        const bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        let scaleX = this.cameras.main.width / bg.width + 0.2;
        let scaleY = this.cameras.main.height / bg.height + 0.2;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0);

        this.add.text(Number(this.game.config.width) * 0.5, Number(this.game.config.height) * 0.5, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    async connect () {
        const client = new Client("ws://localhost:3001");

        try {
            this.room = await client.joinOrCreate("game_room", {});

            console.log("successfully connected");
        } catch (e) {
            console.log("Could not connect with the server.");
        }
    }
}