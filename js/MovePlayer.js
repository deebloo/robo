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
  function hasAnimation(dir)
  {
    if(player.animations && animations && animations[dir])
    {
      return player.animations.play(animations[dir]);
    }
  }

  function key(dir)
  {
    return cursors[dir].isDown;
  }

  if (key('left'))
  {
    // Move player left
    player.body.velocity.x = -velocityX;

    hasAnimation('left');
  }
  else if (key('right'))
  {
    // Move player right
    player.body.velocity.x = velocityX;

    hasAnimation('right');
  }
  else
  {
    // Idle animation
    hasAnimation('idle');
  }

  if (key('up'))
  {
    // Move player up
    player.body.velocity.y = -velocityY;

    hasAnimation('up');
  }
  else if (key('down'))
  {
    // Move player down
    player.body.velocity.y = velocityY;

    hasAnimation('down');
  }
}
