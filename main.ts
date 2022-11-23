namespace SpriteKind {
    export const Moon = SpriteKind.create()
    export const Site = SpriteKind.create()
    export const effect = SpriteKind.create()
}
function ChangeImage () {
    transformSprites.rotateSprite(Lander, transformSprites.getRotation(Lander))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Moon, function (sprite, otherSprite) {
    if(!(Lander.overlapsWith(Sites2))){
        game.splash("THAT'S NOT A LANDING SITE!")
    }
    else if (sprite.vy > 10 ) {
        game.splash("YOU LANDED TOO HARD!")
    }
     else {
        game.over(false)
    }
})
function thrustLander () {
    thrustDir = transformSprites.getRotation(Lander) - 90
    thrustDirRads = thrustDir * 3.1416 / 180
    thrustX = THRUSTER_VELOCITY * Math.cos(thrustDirRads)
    thrustY = THRUSTER_VELOCITY * Math.sin(thrustDirRads)
    Lander.ax = thrustX
    Lander.ay = thrustY
}
function RotateLander (Amount: number) {
    transformSprites.changeRotation(Lander, Amount)
}
let fire: Sprite = null
let thrustY = 0
let thrustX = 0
let thrustDirRads = 0
let thrustDir = 0
let Sites2: Sprite = null
let Lander: Sprite = null
let THRUSTER_VELOCITY = 0
let oldRotation = 0
THRUSTER_VELOCITY = 20
Lander = sprites.create(assets.image`myImage`, SpriteKind.Player)
Lander.setVelocity(13, 0)
scene.cameraFollowSprite(Lander)
tiles.setCurrentTilemap(tilemap`level1`)
let Moon2 = sprites.create(assets.image`Moon2`, SpriteKind.Moon)
tiles.placeOnTile(Moon2, tiles.getTileLocation(10, 12))
Sites2 = sprites.create(assets.image`Sites2`, SpriteKind.Site)
tiles.placeOnTile(Sites2, tiles.getTileLocation(10, 12))
game.onUpdateInterval(1, function () {
    if (controller.right.isPressed()) {
        RotateLander(1)
    }
    if (controller.left.isPressed()) {
        RotateLander(-1)
    }
})
forever(function () {
    if (controller.up.isPressed()) {
        thrustLander()
        fire = sprites.create(assets.image`myImage1`, SpriteKind.effect)
        fire.setPosition(Lander.x, Lander.y)
        transformSprites.rotateSprite(fire, transformSprites.getRotation(Lander))
        Lander.startEffect(effects.spray, 20)
    } else {
        Lander.ax = 0
        Lander.ay = 0
        sprites.destroyAllSpritesOfKind(SpriteKind.effect)
    }
})
game.onUpdateInterval(100, function () {
    Lander.vy += 1
})
game.onUpdateInterval(100, function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.effect)
})
