const fs = require('fs');

function applyChanges() {
    let code = fs.readFileSync('src/App.jsx', 'utf8');

    // 1. Update handleContinue to save to localStorage
    code = code.replace(
        'const finalPokemon = starterPokemons[maxIndex];\n    setAssignedPokemon(finalPokemon);\n    setPhase("pokemon-reveal");',
        `const finalPokemon = starterPokemons[maxIndex];
    setAssignedPokemon(finalPokemon);

    try {
      const pastResults = JSON.parse(localStorage.getItem('pokemonQuizes') || '[]');
      const userName = trainerContext ? trainerContext.trim() : 'Unknown Trainer';
      if (pastResults.length === 0 || pastResults[pastResults.length - 1].name !== userName) {
        pastResults.push({ name: userName, pokemon: finalPokemon.name });
        localStorage.setItem('pokemonQuizes', JSON.stringify(pastResults));
      }
    } catch(e) { console.error(e); }

    setPhase("pokemon-reveal");`
    );

    // 2. Add squads-reveal to the phase check
    code = code.replace(
        'phase === "map-reveal" ||',
        'phase === "map-reveal" ||\n        phase === "squads-reveal" ||'
    );

    // 3. Update map-reveal to point to squads-reveal
    code = code.replace(
        'onClick={() => setPhase("ending-page")}>\n                  FINISH\n                </button>',
        'onClick={() => setPhase("squads-reveal")}>\n                  VIEW SQUADS\n                </button>'
    );

    // 4. Inject squads-reveal component exactly before ending-page
    const squadsRevealStr = `
            {phase === "squads-reveal" && (
              <div className="squads-reveal-container fade-in-section" style={{ width: "90%", maxWidth: "1200px" }}>
                <div className="hp-logo-container">
                  <h2 className="hp-logo-text" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", marginBottom: "2rem" }}>Cultural Personality Squads</h2>
                </div>
                
                <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1rem" }}>
                  {starterPokemons.map(pokemon => {
                     const squadMembers = JSON.parse(localStorage.getItem('pokemonQuizes') || '[]').filter(p => p.pokemon === pokemon.name);
                     return (
                        <div key={pokemon.name} style={{ background: "rgba(255,255,255,0.05)", padding: "2rem", borderRadius: "15px", flex: "1", minWidth: "250px", textAlign: "center", border: "1px solid rgba(255,215,0,0.3)", boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }}>
                           <img src={pokemon.image} alt={pokemon.name} style={{ width: "100px", height: "100px", marginBottom: "1rem", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))" }} />
                           <h2 style={{ color: "#ffd700", marginBottom: "1.5rem", fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>{pokemon.name}</h2>
                           <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "1.2rem", color: "#fff", maxHeight: "250px", overflowY: "auto" }}>
                              {squadMembers.length > 0 ? squadMembers.map((m, i) => <li key={i} style={{ padding: "0.8rem 0", borderBottom: "1px solid rgba(255,255,255,0.1)", letterSpacing: "1px" }}>{m.name}</li>) : <li style={{ padding: "1rem 0", opacity: 0.5, fontStyle: "italic" }}>No members yet</li>}
                           </ul>
                        </div>
                     )
                  })}
                </div>

                <button className="continue-action-btn" style={{ marginTop: "4rem" }} onClick={() => setPhase("ending-page")}>
                  FINISH
                </button>
              </div>
            )}

            {phase === "ending-page"`;

    code = code.replace('{phase === "ending-page"', squadsRevealStr);

    fs.writeFileSync('src/App.jsx', code);
    console.log('App.jsx successfully patched.');
}

applyChanges();
