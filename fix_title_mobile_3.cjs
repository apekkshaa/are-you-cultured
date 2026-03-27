const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf-8');

const regex = /\.word\.w2\s*\{\s*font-size:\s*4vw\s*!important;\s*margin:\s*-0\.5vh\s*0\s*!important;\s*\}/;

const newCss = `.word.w1 {
    font-size: 12vw !important; /* Make CATCH bigger */
  }

  .word.w2 {
    font-size: 5vw !important; 
    margin: -1vh 0 !important;
  }

  .word.w3 {
    font-size: 8vw !important; /* Lock PERSONALITY so it doesn't overflow */
  }`;

if (regex.test(css)) {
  css = css.replace(regex, newCss);
  fs.writeFileSync('src/App.css', css);
  console.log("Replaced successfully!");
} else {
  console.log("Regex didn't match.");
}
