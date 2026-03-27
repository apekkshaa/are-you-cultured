const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf-8');

const regex = /\.main-title\s*\{\s*font-size:\s*8vw\s*!important;[\s\S]*?rgba\(0,0,0,0\.6\)\s*!important;\s*\}/;

const newCss = `.main-title {
    font-size: 6.5vw !important; /* Scaled down considerably so PERSONALITY fits */
    letter-spacing: 0px !important; /* Remove spacing to save horizontal room */
    line-height: 1 !important;
    width: 100% !important;
    -webkit-text-stroke: min(0.5vw, 2px) #3355a5 !important;
    text-shadow: 
      min(0.8vw, 4px) min(0.8vw, 4px) 0px #3355a5,
      0 0 10px rgba(0,0,0,0.6) !important;
  }`;

if (regex.test(css)) {
  css = css.replace(regex, newCss);
  fs.writeFileSync('src/App.css', css);
  console.log("Replaced successfully!");
} else {
  console.log("Regex didn't match.");
}
