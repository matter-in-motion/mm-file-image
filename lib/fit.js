'use strict';
const crop = require('./crop');

const changeAspectRatio = function(src, ratio) {
  let size = {};
  if (src.width > src.height) {
    size.width = Math.round(src.height * ratio);
    size.height = src.height;
  } else {
    size.width = src.width;
    size.height = Math.round(src.width * ratio);
  }
  return size;
}

const fit = {
  scale: function(src, dst) {
    return {
      resize: {
        width: dst.width,
        height: dst.height
      }
    }
  },

  crop: function(src, dst) {
    if (dst.ratio) {
      const { width, height } = changeAspectRatio(dst, dst.ratio);
      dst.width = width;
      dst.height = height;
    }

    const ratio = Math.max(dst.width / src.width, dst.height / src.height);
    const size = {
      width: Math.round(src.width * ratio),
      height: Math.round(src.height * ratio)
    };

    return {
      resize: size,
      crop: crop(size, dst)
    };
  },

  clip: function(src, dst) {
    const ratio = dst.ratio || Math.min(dst.width / src.width, dst.height / src.height);
    return {
      resize: {
        width: Math.round(src.width * ratio),
        height: Math.round(src.height * ratio)
      }
    };
  },

  max: function(src, dst) {
    if (src.width <= dst.width && src.height <= dst.height) {
      return null;
    }

    return fit.clip(src, dst);
  },

  min: function(src, dst) {
    const dstRatio = dst.ratio || dst.width / dst.height;
    let size = changeAspectRatio(src, dstRatio);

    if (size.width < dst.width || size.height < dst.height) {
      size.gravity = dst.gravity;
      return {
        resize: {
          width: size.width,
          height: size.height
        },
        crop: crop(src, size)
      }
    }

    return {
      resize: {
        width: src.width,
        height: src.height
      },
      crop: crop(src, dst)
    }
  }
};


module.exports = fit
