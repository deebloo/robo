var Character = (function()
{
  /**
   * @name Character
   * @param posX X FLOAT position to draw character
   * @param posY Y FLOAT position to draw character
   * @param asset STRING The loaded asset to use
   * @param physics BOOL Should the character use arcade Physics?
   * @param world BOOL Should the character be bound the world stage?
   * @constructor
   */
  function Character(posX, posY, asset, physics, world)
  {
    this.character = game.add.sprite(posX, posY, asset);

    // Enable arcade physics for player
    if(physics) {
      game.physics.arcade.enable(this.character);
    }

    console.log(asset, world);

    // Set character collision with the world bounds
    this.character.body.collideWorldBounds = world;

    return this.character;
  }

  return Character
}());