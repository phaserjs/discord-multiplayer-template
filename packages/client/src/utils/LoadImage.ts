import Phaser from 'phaser';

export function LoadImage (scene: Phaser.Scene, key: string, url: string): Promise<string>
{
    return new Promise((resolve, reject) => {

        const loader = scene.load as Phaser.Loader.LoaderPlugin;

        loader.image(key, url);

        loader.once(`filecomplete-image-${key}`, () => {

            resolve(key);

        });

        loader.on(Phaser.Loader.Events.FILE_LOAD_ERROR, (file: Phaser.Loader.File) => {

            console.error(`LoadImage: ${file.key} failed to load.`);

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
