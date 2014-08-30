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
  if (cursors.left.isDown)
  {
    // Move player left
    player.body.velocity.x = -velocityX;

    if(player.animations && animations && animations.left) {
      player.animations.play(animations.left);
    }
  }
  else if (cursors.right.isDown)
  {
    // Move player right
    player.body.velocity.x = velocityX;

    if(player.animations && animations && animations.right) {
      player.animations.play(animations.right);
    }
  }
  else {
    // Stand still
    if(player.animations && animations && animations.idle) {
      player.animations.play(animations.idle);
    }
  }

  if (cursors.up.isDown)
  {
    // Move player up
    player.body.velocity.y = -velocityY;

    // Stand still
    if(player.animations && animations && animations.up) {
      player.animations.play(animations.up);
    }
  }
  else if (cursors.down.isDown)
  {
    // Move player down
    player.body.velocity.y = velocityY;

    // Stand still
    if(player.animations && animations && animations.down) {
      player.animations.play(animations.down);
    }
  }
}
