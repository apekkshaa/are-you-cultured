const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');
const replacement = `
@media (max-width: 768px) {
  .title-layer { top: 12% !important; }
  .main-title { font-size: 15vw !important; line-height: 1 !important; }
  .word.w1 { font-size: 14vw !important; }
  .word.w2 { font-size: 9vw !important; margin-bottom: 2px !important; }
  .word.w3 { font-size: 15vw !important; }
  .hunt-button-container { top: calc(50vh + 5vh) !important; bottom: auto !important; transform: translateX(-50%) scale(0.9) !important; }
  .trainer-wrapper { width: 60vw !important; left: -10% !important; bottom: 0% !important; }
  .pikachu-wrapper { width: 40vw !important; right: -5% !important; bottom: 5% !important; }
  .player-patch { width: 80vw !important; height: 35vw !important; left: -10% !important; bottom: -5% !important; }
  .enemy-patch { width: 60vw !important; height: 25vw !important; right: -5% !important; bottom: 0% !important; }
  .question-container { padding: 10px !important; margin-top: 5vh !important; }
  .logo-text-elegant { font-size: 1.5rem !important; }
  .question-title { font-size: 1.1rem !important; margin-bottom: 10px !important; }
  .carousel-wrapper { gap: 5px !important; }
  .carousel-nav { font-size: 30px !important; width: 30px !important; }
  .carousel-card { width: 60vw !important; max-width: 220px !important; height: 30vh !important; max-height: 220px !important; min-height: 180px !important; }
  .card-image-placeholder { width: 80px !important; height: 80px !important; font-size: 40px !important; }
  .card-label { font-size: 0.9rem !important; }
  .select-btn { padding: 8px 25px !important; }
}`;

css = css.replace(/@media \(max-width: 768px\) \{[\s\S]*?(?=(@media|$))/g, replacement + "\n\n");
fs.writeFileSync('src/App.css', css);
