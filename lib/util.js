'use strict';
const isArray = Array.isArray;
const path = require('path');
const fit = require('./fit');

function getSize(srcWidth, srcHeight, sizes) {
  if (isArray(sizes)) {
    const srcRatio = srcWidth / srcHeight;
    let sizeIndex = 0;
    let sizeRatio = Math.abs(srcRatio - (sizes[0].width / sizes[0].height));

    for (let i = 1; i < sizes.length; i++) {
      const s = sizes[i];
      const ratio = Math.abs(srcRatio - (s.width / s.height));

      if (ratio < sizeRatio) {
        sizeIndex = i;
        sizeRatio = ratio;
      }
    }

    return sizes[sizeIndex];
  }

  return sizes;
}

module.exports = {
  getOptions: function(task, meta, sizes, data = {}) {
    const size = getSize(meta.width, meta.height, sizes)

    const opts = Object.assign({
      size: {
        width: meta.width,
        height: meta.height
      }
    }, size);

    if (data.ratio) {
      opts.ratio = data.ratio;
      if (opts.fit !== 'min') {
        opts.fit = 'crop';
      }
    }

    if (!opts.fit) {
      opts.fit = 'clip';
    }

    if (opts.mask) {
      opts.mask = path.join(task.media, opts.mask);
    }

    if (!(opts.type && opts.type.id) || opts.type === 'auto' || opts.type.id === 'auto') {
      if (typeof opts.type === 'string') {
        opts.type = undefined;
      }

      opts.type = Object.assign({
        id: meta.format
      }, opts.type);
    }

    opts.src = task.src.file;
    return Object.assign(opts, fit[opts.fit](meta, opts));
  }
};
