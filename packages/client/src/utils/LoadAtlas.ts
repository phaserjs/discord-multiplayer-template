import Phaser from 'phaser';

export function LoadAtlas (scene: Phaser.Scene, key: string, textureURL: string, atlasURL: string): Promise<string>
{
    return new Promise((resolve, reject) => {

        const loader = scene.load as Phaser.Loader.LoaderPlugin;

        loader.atlas(key, textureURL, atlasURL);

        loader.once(`filecomplete-atlas-${key}`, () => {

            resolve(key);

        });

        loader.on(Phaser.Loader.Events.FILE_LOAD_ERROR, (file: Phaser.Loader.File) => {

            console.error(`LoadAtlas: ${file.key} failed to load.`);

            if (file.key === key)
            {
                reject(key);
            }

        });

        if (!loader.isLoading())
        {
            loader.start();
        }

    });
}
