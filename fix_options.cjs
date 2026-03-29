const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf-8');

// The array starts at `const quizQuestions = [`
// We can use a regex to replace every 4-item options array with a 3-item one.
// Let's match:
// options: [
//   { ... },
//   { ... },
//   { ... },
//   { ... },
// ],

const modified = code.replace(
  /options:\s*\[\s*(\{\s*name:[^}]+\}),\s*(\{\s*name:[^}]+\}),\s*(\{\s*name:[^}]+\}),\s*\{\s*name:[^}]+\},?\s*\]/g,
  'options: [\n        $1,\n        $2,\n        $3,\n      ]'
);

fs.writeFileSync('src/App.jsx', modified);
