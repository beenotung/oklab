# Comparing Color Channels of RGB and Lab

This section uses varies colorful images to illustrate the color channels of RGB and Lab color model.

For each image, there are three columns (left to right): original image:, RGB channels and Lab channels.

For the RGB channels part, there are three rows (top to bottom): red (R), green (G), blue (B).

For the Lab channels part, there are three rows (top to bottom): luminosity (L), green-to-red (a), blue-to-yellow (b).

For each channels part, white color represents the highest value or intensity in that channel; black color represents the lowest value; gray-scale gradient represent the values in-between.

## Red-Green Gradient

![red-green color channels](images/red-green-rgb-lab.webp)

**Generation Rule:**

- red = x / width
- green = y / height
- blue = 0

## Blue-Yellow Gradient

![blue-yellow color channels](images/blue-yellow-rgb-lab.webp)

**Generation Rule:**

- red = y / height
- green = y / height
- blue = x / width

## Colorful Image

![colorful emoji color channels](images/colorful-rgb-lab.webp)

Selected from: [Emoji Kitchen](https://emojikitchen.dev/)
