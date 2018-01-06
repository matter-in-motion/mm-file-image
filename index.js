'use strict';
const resize = require('./lib/resize');

module.exports = { resources: { file: { processors: {
  __extend: true,
  image: { resize }
} } } };
