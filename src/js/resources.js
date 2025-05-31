import { ImageSource, Sound, Resource, Loader, SpriteSheet } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.jpg'),
    PlayerRun: new ImageSource('images/Run.png'),
    PlayerJump: new ImageSource('images/Jump.png'),
    PlayerFall: new ImageSource('images/Fall.png'),
    SawOn: new ImageSource('images/Saw-on.png'),
    Appearing: new ImageSource('images/Appearing.png'),
    Disappearing: new ImageSource('images/Disappearing.png'),
    Strawberry: new ImageSource('images/Strawberry.png'),
    Heart: new ImageSource('images/Heart.png'),
    Flag: new ImageSource('images/red-flag.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }