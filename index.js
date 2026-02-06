import Grid1Background from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.16/build/backgrounds/grid1.cdn.min.js';

const bg = Grid1Background(document.getElementById('webgl-canvas'))


const color = 0x48577D;

// Set grid colors
bg.grid.setColors([color, color, color]);

// Set lights to the same color
bg.grid.light1.color.set(color);
bg.grid.light1.intensity = 800; // pick a fixed intensity
bg.grid.light2.color.set(color);
bg.grid.light2.intensity = 400;
