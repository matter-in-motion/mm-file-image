'use strict';
const fsu = require('fsu');
const spawn = require('child_process').spawn;
const BIN = 'gifsicle';

const cropFirst = function(size, crop) {
  const scale = Math.min(size.width / crop.width, size.height / crop.height);

  return {
    left: Math.round(crop.left * scale),
    top: Math.round(crop.top * scale),
    width: Math.round(crop.width * scale),
    height: Math.round(crop.height * scale)
  }
}

module.exports = function(img, opts, cb) {
  let args = [
    '-O3',
    '--no-warnings'
  ];

  if (opts.crop) {
    const crop = cropFirst(opts.size, opts.crop);
    args.push('--crop', `${crop.left},${crop.top}+${crop.width}x${crop.height}`);
    if (opts.resize) {
      args.push('--resize', `${opts.crop.width}x${opts.crop.height}`);
    }
  } else if (opts.resize) {
    args.push('--resize', `${opts.resize.width}x${opts.resize.height}`);
  }

  args.push('-i', `${opts.src}`);

  let error = null;
  const proc = spawn(BIN, args)
    .on('error', err => {
      error = err;
    });

  const out = fsu.createWriteStreamUnique(opts.to, { force: true })
    .on('error', err => {
      proc.kill();
      error = err;
    })
    .on('finish', () => {
      if (error) {
        return cb(error);
      }

      cb(null, {
        path: out.path,
        data: {
          width: opts.crop ? opts.crop.width : opts.resize ? opts.resize.width : opts.size.width,
          height: opts.crop ? opts.crop.height : opts.resize ? opts.resize.height : opts.size.height
        }
      });
    });

  proc.stdout.pipe(out);
};
