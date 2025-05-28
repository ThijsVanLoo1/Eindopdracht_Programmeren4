import { ImageSource, Sound, Resource, Loader, SpriteSheet } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.png'),
    PlayerRun: new ImageSource('/images/Run.png'),
    PlayerJump: new ImageSource('/images/Jump.png'),
    PlayerFall: new ImageSource('/images/Fall.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }