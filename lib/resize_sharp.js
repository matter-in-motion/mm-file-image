'use strict';
const fsu = require('fsu');
const { resize } = require('./sharp');

module.exports = function(img, opts, cb) {
  img = resize(img, opts);

  if (opts.blur) {
    img = img.blur(opts.blur);
  }

  if (opts.mask) {
    img = img.composite([
      {
        input: opts.mask,
        blend: 'dest-in'
      }
    ]);
  }

  img = img.toFormat(opts.type.id, opts.type);
  img.toBuffer((err, buffer, info) => {
    if (err) {
      return cb(err);
    }

    fsu.writeFileUnique(opts.to, buffer, { force: true }, (err, newFilePath) => {
      if (err) {
        return cb(err);
      }

      cb(null, {
        path: newFilePath,
        data: {
          width: info.width,
          height: info.height
        }
      });
    });
  });
};
