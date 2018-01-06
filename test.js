'use strict';
const path = require('path');
const test = require('ava');
const del = require('del');
process.env.NODE_ENV = 'production';

const root = path.join(process.cwd(), 'assets');
const crop = require('./lib/crop');
const fit = require('./lib/fit');
const resize = require('./lib/resize');

test.after.always(() => del([ path.join(root, 'done') ]));

// Crop
test('center', t => {
  const size = crop({ width: 200, height: 400 }, { width: 200, height: 200 });
  t.is(size.top, 100);
  t.is(size.left, 0);
  t.is(size.width, 200);
  t.is(size.height, 200);
});

test('north', t => {
  const size = crop({ width: 200, height: 400 }, { width: 200, height: 200, gravity: 'north' });
  t.is(size.top, 0);
  t.is(size.left, 0);
  t.is(size.width, 200);
  t.is(size.height, 200);
});

test('east', t => {
  const size = crop({ width: 200, height: 400 }, { width: 200, height: 200, gravity: 'east' });
  t.is(size.top, 100);
  t.is(size.left, 0);
  t.is(size.width, 200);
  t.is(size.height, 200);
});

test('south', t => {
  const size = crop({ width: 200, height: 400 }, { width: 200, height: 200, gravity: 'south' });
  t.is(size.top, 200);
  t.is(size.left, 0);
  t.is(size.width, 200);
  t.is(size.height, 200);
});

test('west', t => {
  const size = crop({ width: 200, height: 400 }, { width: 200, height: 200, gravity: 'west' });
  t.is(size.top, 100);
  t.is(size.left, 0);
  t.is(size.width, 200);
  t.is(size.height, 200);
});

test('northeast', t => {
  const size = crop({ width: 200, height: 400 }, { width: 200, height: 200, gravity: 'northeast' });
  t.is(size.top, 0);
  t.is(size.left, 0);
  t.is(size.width, 200);
  t.is(size.height, 200);
});

test('southeast', t => {
  const size = crop({ width: 200, height: 400 }, { width: 200, height: 200, gravity: 'southeast' });
  t.is(size.top, 200);
  t.is(size.left, 0);
  t.is(size.width, 200);
  t.is(size.height, 200);
});

test('southwest', t => {
  const size = crop({ width: 200, height: 400 }, { width: 200, height: 200, gravity: 'southwest' });
  t.is(size.top, 200);
  t.is(size.left, 0);
  t.is(size.width, 200);
  t.is(size.height, 200);
});

test('northwest', t => {
  const size = crop({ width: 200, height: 400 }, { width: 200, height: 200, gravity: 'northwest' });
  t.is(size.top, 0);
  t.is(size.left, 0);
  t.is(size.width, 200);
  t.is(size.height, 200);
});

// Fit
test('scale / downscale', t => {
  const size = fit.scale({ width: 100, height: 20 }, { width: 100, height: 100 });
  t.is(size.resize.width, 100);
  t.is(size.resize.height, 100);
  t.is(size.crop, undefined);
});

test('scale / upscale', t => {
  const size = fit.scale({ width: 100, height: 20 }, { width: 400, height: 400 });
  t.is(size.resize.width, 400);
  t.is(size.resize.height, 400);
  t.is(size.crop, undefined);
});

test('crop / horizontal', t => {
  const size = fit.crop({ width: 300, height: 50 }, { width: 400, height: 400 });
  t.is(size.resize.width, 2400);
  t.is(size.resize.height, 400);
  t.is(size.crop.top, 0);
  t.is(size.crop.left, 1000);
  t.is(size.crop.width, 400);
  t.is(size.crop.height, 400);
});

test('crop / vertical', t => {
  const size = fit.crop({ width: 100, height: 200 }, { width: 400, height: 400 });
  t.is(size.resize.width, 400);
  t.is(size.resize.height, 800);
  t.is(size.crop.top, 200);
  t.is(size.crop.left, 0);
  t.is(size.crop.width, 400);
  t.is(size.crop.height, 400);
});

test('crop / ratio', t => {
  const size = fit.crop({ width: 100, height: 200 }, { width: 500, height: 400, ratio: 1 });
  t.is(size.resize.width, 400);
  t.is(size.resize.height, 800);
  t.is(size.crop.top, 200);
  t.is(size.crop.left, 0);
  t.is(size.crop.width, 400);
  t.is(size.crop.height, 400);
});

test('clip / horizontal', t => {
  const size = fit.clip({ width: 200, height: 50 }, { width: 400, height: 400 });
  t.is(size.resize.width, 400);
  t.is(size.resize.height, 100);
  t.is(size.crop, undefined);
});

test('clip / vertical', t => {
  const size = fit.clip({ width: 100, height: 200 }, { width: 400, height: 400 });
  t.is(size.resize.width, 200);
  t.is(size.resize.height, 400);
  t.is(size.crop, undefined);
});

test('max / larger', t => {
  const size = fit.max({ width: 800, height: 200 }, { width: 400, height: 400 });
  t.is(size.resize.width, 400);
  t.is(size.resize.height, 100);
  t.is(size.crop, undefined);
});

test('max / smaller', t => {
  const size = fit.max({ width: 100, height: 200 }, { width: 400, height: 400 });
  t.is(size, null);
});

test('min / larger', t => {
  const size = fit.min({ width: 1000, height: 800 }, { width: 400, height: 400 });
  t.is(size.resize.width, 1000);
  t.is(size.resize.height, 800);
  t.is(size.crop.top, 200);
  t.is(size.crop.left, 300);
  t.is(size.crop.width, 400);
  t.is(size.crop.height, 400);
});

test('min / smaller', t => {
  const size = fit.min({ width: 100, height: 200 }, { width: 400, height: 400 });
  t.is(size.resize.width, 100);
  t.is(size.resize.height, 100);
  t.is(size.crop.top, 50);
  t.is(size.crop.left, 0);
  t.is(size.crop.width, 100);
  t.is(size.crop.height, 100);
});

// Resize jpeg
test.cb('resizes jpeg image with sharp. Default', t => {
  const task = {
    id: 0,
    root: root,
    src: {
      field: 0,
      file: path.join(root, 'test.jpg'),
      filename: 'test',
      ext: '.jpg'
    },
    dst: {
      name: 'large',
      width: 100,
      height: 100,
      to: path.join(root, 'done', 'test_{_##}.jpg')
    }
  };

  resize(task, (err, res) => {
    if (err) {
      t.fail(err);
      return t.end();
    }
    t.truthy(res);
    t.is(res.id, task.id);
    t.is(res.name, task.dst.name);
    t.is(res.data.width, 100);
    t.is(res.data.height, 75);
    t.end();
  });
});

test.cb('resizes jpeg image with sharp. Multiple sizes', t => {
  const task = {
    id: 0,
    root: root,
    src: {
      field: 0,
      file: path.join(root, 'test.jpg'),
      filename: 'test',
      ext: '.jpg'
    },
    dst: [
      { name: 'h', width: 500, height: 100, to: path.join(root, 'done', 'test_h{_##}.jpg') },
      { name: 's', width: 500, height: 500, to: path.join(root, 'done', 'test_s{_##}.jpg') },
      { name: 'v', width: 100, height: 500, to: path.join(root, 'done', 'test_v{_##}.jpg') }
    ]
  };

  resize(task, (err, res) => {
    if (err) {
      t.fail(err);
      return t.end();
    }
    t.truthy(res);
    t.is(res.id, task.id);
    t.is(res.name, task.dst[1].name);
    t.is(res.data.width, 500);
    t.is(res.data.height, 375);
    t.end();
  });
});

test.cb('resizes jpeg image with sharp. Max', t => {
  const task = {
    id: 0,
    root: root,
    src: {
      field: 0,
      file: path.join(root, 'test.jpg'),
      filename: 'test',
      ext: '.jpg'
    },
    dst: {
      name: 'large',
      width: 500,
      height: 500,
      fit: 'max',
      type: {
        id: 'jpeg',
        quality: 70
      },
      to: path.join(root, 'done', 'test_max{_##}.jpg')
    }
  };

  resize(task, (err, res) => {
    if (err) {
      t.fail(err);
      return t.end();
    }
    t.truthy(res);
    t.is(res.id, task.id);
    t.is(res.name, task.dst.name);
    t.is(res.data.width, 500);
    t.is(res.data.height, 375);
    t.end();
  });
});

test.cb('resizes jpeg image with sharp. Scale', t => {
  const task = {
    id: 0,
    root: root,
    src: {
      field: 0,
      file: path.join(root, 'test.jpg'),
      filename: 'test',
      ext: '.jpg'
    },
    dst: {
      name: 'large',
      width: 100,
      height: 30,
      fit: 'scale',
      type: {
        id: 'jpg',
        quality: 70
      },
      to: path.join(root, 'done', 'test_scale{_##}.jpg')
    }
  };

  resize(task, (err, res) => {
    if (err) {
      t.fail(err);
      return t.end();
    }
    t.truthy(res);
    t.is(res.id, task.id);
    t.is(res.name, task.dst.name);
    t.is(res.data.width, 100);
    t.is(res.data.height, 30);
    t.end();
  });
});

test.cb('resizes jpeg image with sharp. Ratio', t => {
  const task = {
    id: 0,
    root: root,
    src: {
      field: 0,
      file: path.join(root, 'test.jpg'),
      filename: 'test',
      ext: '.jpg'
    },
    dst: {
      name: 'large',
      width: 100,
      height: 30,
      fit: 'clip',
      type: {
        id: 'jpeg',
        quality: 70
      },
      to: path.join(root, 'done', 'test_ratio{_##}.jpg')
    },
    data: {
      ratio: 1
    }
  };

  resize(task, (err, res) => {
    if (err) {
      t.fail(err);
      return t.end();
    }
    t.truthy(res);
    t.is(res.id, task.id);
    t.is(res.name, task.dst.name);
    t.is(res.data.width, 30);
    t.is(res.data.height, 30);
    t.end();
  });
});

test.cb('resizes jpeg image with sharp. Clip', t => {
  const task = {
    id: 0,
    root: root,
    src: {
      field: 0,
      file: path.join(root, 'test.jpg'),
      filename: 'test',
      ext: '.jpg'
    },
    dst: {
      name: 'large',
      width: 50,
      height: 100,
      fit: 'clip',
      type: {
        id: 'jpeg',
        quality: 70
      },
      to: path.join(root, 'done', 'test_clip{_##}.jpg')
    }
  };

  resize(task, (err, res) => {
    if (err) {
      t.fail(err);
      return t.end();
    }
    t.truthy(res);
    t.is(res.id, task.id);
    t.is(res.name, task.dst.name);
    t.is(res.data.width, 50);
    t.is(res.data.height, 38);
    t.end();
  });
});

test.cb('resizes jpeg image with sharp. Crop, blur and mask', t => {
  const task = {
    id: 0,
    root: root,
    media: root,
    src: {
      field: 0,
      file: path.join(root, 'test.jpg'),
      filename: 'test',
      ext: '.jpg'
    },
    dst: {
      name: 'large',
      mask: 'mask.png',
      width: 100,
      height: 100,
      blur: 10,
      fit: 'crop',
      type: {
        id: 'png'
      },
      to: path.join(root, 'done', 'test_crop{_##}.png')
    }
  };

  resize(task, (err, res) => {
    if (err) {
      t.fail(err);
      return t.end();
    }
    t.truthy(res);
    t.is(res.id, task.id);
    t.is(res.name, task.dst.name);
    t.is(res.data.width, 100);
    t.is(res.data.height, 100);
    t.end();
  });
});

// Resize gif
test.cb('resizes animated gif image with gifsicle. Max', t => {
  const task = {
    id: 0,
    root: root,
    src: {
      field: 0,
      file: path.join(root, 'test.gif'),
      filename: 'test',
      ext: '.gif'
    },
    dst: {
      name: 'large',
      width: 100,
      height: 50,
      fit: 'max',
      type: 'auto',
      to: path.join(root, 'done', 'test{_##}.gif')
    }
  };

  resize(task, (err, res) => {
    if (err) {
      t.fail(err);
      return t.end();
    }
    t.truthy(res);
    t.is(res.id, task.id);
    t.is(res.name, task.dst.name);
    t.is(res.data.width, 50);
    t.is(res.data.height, 50);
    t.end();
  });
});

test.cb('resizes animated gif image with gifsicle. Crop', t => {
  const task = {
    id: 0,
    root: root,
    src: {
      field: 0,
      file: path.join(root, 'test.gif'),
      filename: 'test',
      ext: '.gif'
    },
    dst: {
      name: 'large',
      width: 100,
      height: 50,
      fit: 'crop',
      type: 'auto',
      to: path.join(root, 'done', 'test{_##}.gif')
    }
  };

  resize(task, (err, res) => {
    if (err) {
      t.fail(err);
      return t.end();
    }
    t.truthy(res);
    t.is(res.id, task.id);
    t.is(res.name, task.dst.name);
    t.is(res.data.width, 100);
    t.is(res.data.height, 50);
    t.end();
  });
});
