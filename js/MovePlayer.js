/**
 * @name Move Player
 * @param player player object
 * @param velocityX Int
 * @param velocityY Int
 * @param animations Animation Names {left: 'left', right: 'right'}
 * @description Move player up, down, left, or right with give animations. (Call this in your Update function)
 */
function MovePlayer(player, velocityX, velocityY, animations)
{
  /**
   * @name Has Animation
   * @param dir STRING direct of animation
   * @returns BOOL
   */
  function animate(dir)
  {
    if(player.animations && animations && animations[dir])
    {
      return player.animations.play(animations[dir]);
    }
  }

  /**
   * @name key
   * @param dir STRING direction of animation
   * @returns Object
   */
  function key(dir)
  {
    return cursors[dir].isDown;
  }

  /**
   * Check to see if one of the directional keys have been pressed
   * and move the character and play the animation in the correct direction
   */
  if (key('left'))
  {
    // Move player left
    player.body.velocity.x = -velocityX;

    animate('left');
  }
  else if (key('right'))
  {
    // Move player right
    player.body.velocity.x = velocityX;

    animate('right');
  }
  else
  {
    // Idle animation
    animate('idle');
  }

  if (key('up'))
  {
    // Move player up
    player.body.velocity.y = -velocityY;

    animate('up');
  }
  else if (key('down'))
  {
    // Move player down
    player.body.velocity.y = velocityY;

    animate('down');
  }
}
