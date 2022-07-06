import Phaser from "phaser";
import React, {useEffect, useState} from "react";

// @ts-ignore
import testImage from "../assets/test_image.jpg";

export const PhaserGameComponent = () => {

    const [isReady, setReady] = useState(false);

    useEffect(() => {
        let game = new Phaser.Game({
            type: Phaser.AUTO,
            scene: [ExampleScene],
            scale: {
                mode: Phaser.Scale.ScaleModes.FIT,
                parent: "phaser-example",
                //autoCenter: Phaser.Scale.Center.CENTER_BOTH,
                width: 800,
                height: 600,
            }
        });

        game.events.on("READY", setReady)

        return () => {
            setReady(false)
            game.destroy(true)
        }
    }, []);

    return (
        <div id="phaser-example" className={isReady ? "visible" : "hidden"}></div>
    )
}

export default class ExampleScene extends Phaser.Scene {
    preload() {
        this.load.image("osel", testImage);
    }
    create() {
        let osel_sprite = this.add.image(300, 300, "osel");
        osel_sprite.scale = .5;
        const text = this.add.text(250, 250, "Test text");
        text.setInteractive({ useHandCursor: true });
        this.game.events.emit("READY", true);
    }
}