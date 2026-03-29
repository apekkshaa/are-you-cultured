const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace(
  'name: "Bulbasaur",',
  'name: "Bulbasaur",\n      tagline: "🧩 You bring order to chaos.",'
);

code = code.replace(
  'name: "Charmander",',
  'name: "Charmander",\n      tagline: "🤝 You make teams actually feel like teams.",'
);

code = code.replace(
  'name: "Squirtle",',
  'name: "Squirtle",\n      tagline: "⚡ You make things happen and that too fast.",'
);

code = code.replace(
  '<p className="house-description">{assignedPokemon.description}</p>',
  '<p className="house-description">{assignedPokemon.description}</p>\n                {assignedPokemon.tagline && <h3 className="house-tagline" style={{ marginTop: "15px", color: "#ffd700", textShadow: "1px 1px 3px rgba(0,0,0,0.8)", fontSize: "1.2rem", fontWeight: "bold" }}>{assignedPokemon.tagline}</h3>}'
);

fs.writeFileSync('src/App.jsx', code);
