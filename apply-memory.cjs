const fs = require('fs');

function applyChanges() {
    let code = fs.readFileSync('src/App.jsx', 'utf8');

    // 1. Add squad state under answers
    if (!code.includes('const [squads, setSquads]')) {
        code = code.replace(
            'const [answers, setAnswers] = useState([]);',
            'const [answers, setAnswers] = useState([]);\n  const [squads, setSquads] = useState([]);'
        );
    }

    // 2. Remove localStorage write and push to squads instead
    const localStorageWrite = `    try {
      const pastResults = JSON.parse(localStorage.getItem('pokemonQuizes') || '[]');
      const userName = trainerContext ? trainerContext.trim() : 'Unknown Trainer';
      if (pastResults.length === 0 || pastResults[pastResults.length - 1].name !== userName) {
        pastResults.push({ name: userName, pokemon: finalPokemon.name });
        localStorage.setItem('pokemonQuizes', JSON.stringify(pastResults));
      }
    } catch(e) { console.error(e); }`;

    const stateWrite = `    const userName = trainerContext ? trainerContext.trim() : 'Unknown Trainer';
    setSquads(prev => {
      if (prev.length === 0 || prev[prev.length - 1].name !== userName) {
        return [...prev, { name: userName, pokemon: finalPokemon.name }];
      }
      return prev;
    });`;

    code = code.replace(localStorageWrite, stateWrite);

    // 3. Prevent squads-reveal from using localStorage read
    const localStorageRead = "const squadMembers = JSON.parse(localStorage.getItem('pokemonQuizes') || '[]').filter(p => p.pokemon === pokemon.name);";
    const stateRead = "const squadMembers = squads.filter(p => p.pokemon === pokemon.name);";

    code = code.replace(localStorageRead, stateRead);

    // 4. Update PLAY AGAIN to reset everything EXCEPT squads
    const oldPlayAgain = 'onClick={() => window.location.reload()}';
    const newPlayAgain = `onClick={() => {
                  setPhase('entering');
                  setTrainerNameInput('');
                  setTrainerContext('');
                  setCurrentQuestionIndex(0);
                  setCarouselIndex(0);
                  setAssignedPokemon(null);
                  setAnswers([]);
                }}`;

    code = code.replace(oldPlayAgain, newPlayAgain);

    fs.writeFileSync('src/App.jsx', code);
    console.log('App.jsx successfully patched for memory state.');
}

applyChanges();
