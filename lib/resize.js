'use strict';
const path = require('path');
const getImage = require('./sharp').getImage;

const resize = {
  gifsicle: require('./resize_gifsicle'),
  sharp: require('./resize_sharp')
}

module.exports = function(task, cb) {
  getImage(task, (err, img, dst) => {
    if (err) {
      return cb(err);
    }

    //use gifsicle for animated gifs
    const lib = task.src.ext === '.gif' && dst.type.id === 'gif' ? 'gifsicle' : 'sharp';
    resize[lib](img, dst, function(err, res) {
      if (err) {
        return cb(err);
      }

      cb(null, {
        id: task.id,
        name: dst.name,
        absolute: res.path,
        relative: path.relative(task.root, res.path),
        data: res.data
      });
    });
  });
};
