@namespace
class SpriteKind:
    Moon = SpriteKind.create()
    Site = SpriteKind.create()
    effect = SpriteKind.create()
def ChangeImage():
    transformSprites.rotate_sprite(Lander, transformSprites.get_rotation(Lander))

def on_on_overlap(sprite, otherSprite):
    if sprite.vy < 10 and sprite.overlaps_with(Sites2):
        game.over(True)
    else:
        game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.Moon, on_on_overlap)

def thrustLander():
    global thrustDir, thrustDirRads, thrustX, thrustY
    thrustDir = transformSprites.get_rotation(Lander) - 90
    thrustDirRads = thrustDir * 3.1416 / 180
    thrustX = THRUSTER_VELOCITY * Math.cos(thrustDirRads)
    thrustY = THRUSTER_VELOCITY * Math.sin(thrustDirRads)
    Lander.ax = thrustX
    Lander.ay = thrustY
def RotateLander(Amount: number):
    transformSprites.change_rotation(Lander, Amount)
fire: Sprite = None
thrustY = 0
thrustX = 0
thrustDirRads = 0
thrustDir = 0
Sites2: Sprite = None
Lander: Sprite = None
THRUSTER_VELOCITY = 0
oldRotation = 0
THRUSTER_VELOCITY = 20
Lander = sprites.create(assets.image("""
    myImage
"""), SpriteKind.player)
Lander.set_velocity(13, 0)
scene.camera_follow_sprite(Lander)
tiles.set_current_tilemap(tilemap("""
    level1
"""))
Moon2 = sprites.create(assets.image("""
    Moon
"""), SpriteKind.Moon)
tiles.place_on_tile(Moon2, tiles.get_tile_location(10, 12))
Sites2 = sprites.create(assets.image("""
    Sites
"""), SpriteKind.Site)
tiles.place_on_tile(Sites2, tiles.get_tile_location(10, 12))

def on_update_interval():
    if controller.right.is_pressed():
        RotateLander(1)
    if controller.left.is_pressed():
        RotateLander(-1)
game.on_update_interval(1, on_update_interval)

def on_forever():
    global fire
    if controller.up.is_pressed():
        thrustLander()
        fire = sprites.create(assets.image("""
            myImage1
        """), SpriteKind.effect)
        fire.set_position(Lander.x, Lander.y)
        transformSprites.rotate_sprite(fire, transformSprites.get_rotation(Lander))
    else:
        Lander.ax = 0
        Lander.ay = 0
        sprites.destroy_all_sprites_of_kind(SpriteKind.effect)
forever(on_forever)

def on_update_interval2():
    Lander.vy += 1
game.on_update_interval(100, on_update_interval2)

def on_update_interval3():
    sprites.destroy_all_sprites_of_kind(SpriteKind.effect)
game.on_update_interval(100, on_update_interval3)
