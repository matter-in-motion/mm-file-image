'use strict';

module.exports = function(src, dst) {
  const gravity = dst.gravity;
  let top = 0;
  let left = 0;

  switch (gravity) {
    case 'north':
      left = Math.round((src.width - dst.width) / 2);
      break;
    case 'east':
      top = Math.round((src.height - dst.height) / 2);
      left = src.width - dst.width;
      break;
    case 'south':
      top = src.height - dst.height;
      left = Math.round((src.width - dst.width) / 2);
      break;
    case 'west':
      top = Math.round((src.height - dst.height) / 2);
      break;
    case 'northeast':
      left = src.width - dst.width;
      break;
    case 'southeast':
      top = src.height - dst.height;
      left = src.width - dst.width;
      break;
    case 'southwest':
      top = src.height - dst.height;
      break;
    case 'northwest':
      break;
    default: // center
      top = Math.round((src.height - dst.height) / 2);
      left = Math.round((src.width - dst.width) / 2);
  }

  return { top, left, width: dst.width, height: dst.height }
}
