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
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.addBg();

        await this.connect();

        this.room.state.players.onAdd((player: any, sessionId: any) => {
            console.log(`player joined: ${sessionId}`);

           /*  player.listen("position", (position) => {
                console.log("position updated:", position);
            }); */
        });

        this.room.state.players.onRemove((player: any, sessionId: any) => {
            console.log(`player left: ${sessionId}`);
        });

        const letter = this.add.image(Number(this.game.config.width) * 0.5, 300, 'a').setInteractive();
        letter.name = 'a';

        this.input.setDraggable(letter);
        letter.on("drag", (pointer: object, dragX: number, dragY: number) => {
            letter.x = Phaser.Math.Clamp(dragX, (letter.displayWidth / 2), Number(this.game.config.width) - (letter.displayWidth / 2));
            letter.y = Phaser.Math.Clamp(dragY,  (letter.displayHeight / 2), Number(this.game.config.height) - (letter.displayHeight / 2));
        
            // Send position update to the server
            this.room.send("move", {imageId: letter.name, x: letter.x, y: letter.y});
        });
    }

    async connect () {
        const client = new Client("ws://localhost:3001");

        try {
            this.room = await client.joinOrCreate("game");

            console.log("Successfully connected!");
        } catch (e) {
            console.log(`Could not connect with the server: ${e}`);
        }
    }

    addBg() {
        const bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        let scaleX = this.cameras.main.width / bg.width + 0.2;
        let scaleY = this.cameras.main.height / bg.height + 0.2;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0);
    }
}