const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf-8');

css = css.replace(
`  /* Keep the sprites at the bottom and reduce their size/container footprint */
  .trainer-wrapper {
    bottom: -10vw !important;
    height: 40vh !important;
  }
  
  .pikachu-wrapper {
    bottom: -5vw !important;
    height: 30vh !important;
  }`,
`  /* Keep the sprites at the bottom and reduce their size/container footprint */
  .trainer-wrapper {
    bottom: 5vh !important;
    left: 2vw !important;
    width: 60vw !important;
    height: auto !important;
  }
  
  .pikachu-wrapper {
    bottom: 15vh !important;
    right: 5vw !important;
    width: 35vw !important;
    height: auto !important;
  }

  .player-patch {
    width: 70vw !important;
    height: 15vh !important;
    bottom: 0 !important;
    left: -5vw !important;
  }

  .enemy-patch {
    width: 50vw !important;
    height: 10vh !important;
    bottom: 12vh !important;
    right: -2vw !important;
  }
  
  .projectconst fs = require('fs');
let !ilet css = fs.readFileSyn !
css = css.replace(
`  /* Keep the sprites at the
cs`  /* Keep the sp`   .trainer-wrapper {
    bottom: -10vw !important;
    height: 40vh !important;
0%) scale(0.9) !importa    height: 40vh !important;ant;
  }`,
`  .hunt-button-cont  ne  {    btop: 38vh !impor    height: 30vh !importantat  }`,
`  /* Keep the spriteant;
    z-index: 100 !important;
  }`
);

fs.writeFileSync('src/App.css', css);
