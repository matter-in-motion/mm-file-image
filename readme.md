# Matter In Motion. Image processor for file extension

[![NPM Version](https://img.shields.io/npm/v/mm-file-image.svg?style=flat-square)](https://www.npmjs.com/package/mm-file-image)
[![NPM Downloads](https://img.shields.io/npm/dt/mm-file-image.svg?style=flat-square)](https://www.npmjs.com/package/mm-file-image)

This is processor for the [file](ttps://github.com/matter-in-motion/mm-file) extension.

## Usage

[Extensions installation instructions](https://github.com/matter-in-motion/mm/blob/master/docs/extensions.md).

## Methods

### resize
* **name** — can be added to the file name in result
* **to** — filepath to save to. (More info)[https://github.com/matter-in-motion/mm-file]
* **width** — number
* **height** — number
* **mask** — path to mask file, relative to media path
* **blur** — [radius, sigma]
* **fit** — fit option, default clip
  - **clip** — resizes the image to fit within the width and height boundaries without cropping or distorting the image. The resulting image will match one of the constraining dimensions, while the other dimension is altered to maintain the same aspect ratio of the input image.
  - **crop** — resizes the image to fill the width and height dimensions and crops any excess image data. The resulting image will match the width and height constraints without distorting the image.
  - **max** — resizes the image to fit within the width and height dimensions without cropping or distorting the image, but will not increase the size of the image if it is smaller than the output size. The resulting image will maintain the same aspect ratio of the input image.
  - **min** — resizes and crops the image to match the aspect ratio of the requested width and height. Will not exceed the original width and height of the image.
  - **scale** — scales the image to fit the constraining dimensions exactly. The resulting image will fill the dimensions, and will not maintain the aspect ratio of the input image.
* **gravity** — string, default `center`. north, east, south, west, northeast, southeast, southwest, northwest, center, entropy, attention
  - **entropy** — focus on the region with the highest Shannon entropy.
  - **attention** — focus on the region with the highest luminance frequency, color saturation and presence of skin tones.

**_entropy_ and _attention_ are not available for `gif` output**

* **type** — output file type or "auto", object with type options
  - **id** — output format (auto or jpeg, png, gif, etc...)
  - **quality** — number 1..100 (can be vary check different formats options)

The image processor can accept an array of values. It will find the closest width/height ratio for the provided image.

## GIF
If you need to write to gif format you need to install [gifsicle](http://www.lcdf.org/gifsicle/)

License MIT

© velocityzen
