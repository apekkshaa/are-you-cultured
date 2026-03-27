const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf-8');

const regex = /@media\s*\(\max-width:\s*768px\)\s*\{\s*\/\*\s*Title layout\s*\*\/[\s\S]*?\.main-title\s*\{[\s\S]*?\}\s*/;

const newCss = `@media (max-width: 768px) {
  /* Title layout */
  .title-layer {
    top: 0 !important;
    height: 35vh !important;
    align-items: flex-end !important;
    padding-bottom: 2vh !important;
  }
  
  .main-title {
    font-size: 8vw !important; /* Smaller to fit PERSONALITY horizontally */
    line-height: 1 !important;
    -webkit-text-stroke: min(0.6vw, 3px) #3355a5 !important;
    text-shadow: 
      min(1vw, 5px) min(1vw, 5px) 0px #3355a5,
      0 0 15px rgba(0,0,0,0.6) !important;
  }

  .word.w2 {
    font-size: 4vw !important; /* Slightly larger on mobile for visibility */
    margin: -0.5vh 0 !important;
  }
`;

const modified = css.replace(regex, newCss);
fs.writeFileSync('src/App.css', modified);
