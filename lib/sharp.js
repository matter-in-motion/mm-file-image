'use strict';
const sharp = require('sharp');
const getOptions = require('./util').getOptions;

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
      return img
        .resize(opts.resize.width, opts.resize.height)
        .ignoreAspectRatio();

    case 'min':
    case 'crop':
      return img
        .resize(opts.crop.width, opts.crop.height)
        .crop(sharp.gravity[opts.gravity] || sharp.strategy[opts.gravity]);

    case 'clip':
      return img
        .resize(opts.resize.width, opts.resize.height)
        .max();

    case 'max':
      if (opts.resize) {
        return img
          .resize(opts.resize.width, opts.resize.height)
          .max()
      }
  }

  return img;
};

module.exports = {
  getImage,
  resize
};
