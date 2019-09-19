'use strict';
const sharp = require('sharp');
const { getOptions } = require('./util');

const getImage = function(task, cb) {
  let img;
  try {
    img = sharp(task.src.file).rotate();
  } catch (e) {
    return cb(e);
  }

  img.metadata((err, metadata) => {
    if (err) {
      return cb(err);
    }

    const opts = getOptions(task, metadata, task.dst, task.data);
    cb(null, img, opts);
  })
};

const resize = function(img, opts) {
  switch (opts.fit) {
    case 'scale':
      return img.resize({
        width: opts.resize.width,
        height: opts.resize.height,
        fit: 'fill'
      })

    case 'min':
    case 'crop':
      return img.resize({
        width: opts.crop.width,
        height: opts.crop.height,
        fit: 'cover',
        position: sharp.gravity[opts.gravity] || sharp.strategy[opts.gravity]
      });

    case 'clip':
      return img.resize({
        width: opts.resize.width,
        height: opts.resize.height,
        fit: 'inside'
      })

    case 'max':
      if (opts.resize) {
        return img.resize({
          width: opts.resize.width,
          height: opts.resize.height,
          fit: 'inside'
        })
      }
  }

  return img;
};

module.exports = {
  getImage,
  resize
};
