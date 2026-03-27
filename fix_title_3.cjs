const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf-8');

css = css.replace(
`.word.w2 { animation-delay: 0.25s; font-size: min(8vw, 3rem); color: #f7f5ed; -webkit-text-stroke: 1px rgba(212, 175, 55, 0.8); text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);}`,
`.word.w2 { animation-delay: 0.25s; font-size: min(4vw, 1.5rem); color: #f7f5ed; -webkit-text-stroke: 0px; text-shadow: 0 2px 5px rgba(0,0,0,0.8); letter-spacing: 2px; }`
);

fs.writeFileSync('src/App.css', css);
