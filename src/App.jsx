import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [phase, setPhase] = useState("entering"); // 'entering', 'aiming', 'throwing', 'impact', 'finished', 'transitioning-zoom', 'transitioning-text', 'questions', 'calculating-result'
  const [trainerNameInput, setTrainerNameInput] = useState("");
  const [trainerContext, setTrainerContext] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [assignedPokemon, setAssignedPokemon] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [squads, setSquads] = useState([]);

  const starterPokemons = [
    {
      name: "Bulbasaur",
      tagline: "🧩 You bring order to chaos.",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      description: "You are a Rules-Follower. Just like Bulbasaur, you have a steady, nurturing cultural personality. You thrive in environments that allow for continuous growth, bringing a calming and dependable presence to your team through structure and clear processes.",
    },
    {
      name: "Charmander",
      tagline: "🤝 You make teams actually feel like teams.",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      description: "You are Relationship Centric. Just like Charmander, your alignment reveals a highly passionate, driven, and warm cultural personality. Your spirited energy and loyalty mean you tackle challenges head-on, lighting the way for others and prioritizing strong human connections.",
    },
    {
      name: "Squirtle",
      tagline: "⚡ You make things happen—fast.",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      description: "You are Direct & Egalitarian. Just like Squirtle, your alignment shows a highly adaptable, straightforward, and resilient cultural personality. You flow easily through changing environments and communicate openly, treating everyone equally no matter the situation.",
    }
  ];

  const handleContinue = async () => {
    // Tally answers to find the mode
    const counts = [0, 0, 0];
    answers.forEach((ans) => {
      if (ans >= 0 && ans <= 2) counts[ans]++;
    });

    let maxIndex = 0;
    let maxVal = counts[0];
    if (counts[1] > maxVal) { maxVal = counts[1]; maxIndex = 1; }
    if (counts[2] > maxVal) { maxVal = counts[2]; maxIndex = 2; }

    const finalPokemon = starterPokemons[maxIndex];
    setAssignedPokemon(finalPokemon);
    setPhase("pokemon-reveal"); // Move quickly to the next phase

    const userName = trainerContext ? trainerContext.trim() : 'Unknown Trainer';

    try {
      // 1. Fetch latest data (no-store prevents browser caching issues)
      const response = await fetch("https://api.restful-api.dev/objects/ff8081819d150699019d3a30bdf14294", {
        cache: "no-store"
      });
      const responseJson = await response.json();
      let currentData = responseJson.data || [];
      if (!Array.isArray(currentData)) currentData = [];

      const newEntry = { name: userName, pokemon: finalPokemon.name };
      // Deduplicate if user clicks multiple times, but allow updating their pokemon
      const existingUserIndex = currentData.findIndex(entry => entry.name === userName);
      let dataToSave;

      if (existingUserIndex !== -1) {
        // Update existing user's pokemon
        dataToSave = [...currentData];
        dataToSave[existingUserIndex].pokemon = finalPokemon.name;
      } else {
        // Add new user
        dataToSave = [...currentData, newEntry];
      }

      // 2. Put back updated data
      await fetch("https://api.restful-api.dev/objects/ff8081819d150699019d3a30bdf14294", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "squads", data: dataToSave })
      });

      // Update local state temporarily
      setSquads(dataToSave);
    } catch (err) {
      console.error("Error syncing squad data:", err);
    }
  };

  const quizQuestions = [
    {
      title: "You’re assigned to a global team project. Your first instinct is:",
      options: [
        { name: "Clarify roles, deadlines, and expectations", emoji: "📋" },
        { name: "Get to know teammates before diving into work", emoji: "🤝" },
        { name: "Start working and align along the way", emoji: "🚀" },
      ],
    },
    {
      title: "In a virtual team meeting, What would you do:",
      options: [
        { name: "Stick closely to the agenda", emoji: "📝" },
        { name: "Encourage participation and check how people feel", emoji: "🗣️" },
        { name: "Focus on decisions and next steps", emoji: "🎯" },
      ],
    },
    {
      title: "A teammate disagrees with your approach. You would:",
      options: [
        { name: "Refer to data, guidelines, or prior examples", emoji: "📊" },
        { name: "Try to understand their perspective and maintain harmony", emoji: "🕊️" },
        { name: "Address it directly and move toward a solution", emoji: "🛠️" },
      ],
    },
    {
      title: "A company process feels slow and inefficient. You would:",
      options: [
        { name: "Follow it as defined", emoji: "📜" },
        { name: "Discuss with the team before changing anything", emoji: "💬" },
        { name: "Adapt or bypass it to move faster", emoji: "⚡" },
      ],
    },
    {
      title: "When giving feedback, you:",
      options: [
        { name: "Focus on clarity and correctness", emoji: "✅" },
        { name: "Soften your message to maintain the relationship", emoji: "💡" },
        { name: "Are direct and to the point", emoji: "🏹" },
      ],
    },
    {
      title: "You receive unclear instructions from a manager in another country. what would you do:",
      options: [
        { name: "Ask for detailed clarification", emoji: "❓" },
        { name: "Set up a quick call to align expectations", emoji: "📞" },
        { name: "Make assumptions and proceed", emoji: "🏃" },
      ],
    },
    {
      title: "In team settings, you naturally take the role of:",
      options: [
        { name: "Organizer (structure, planning)", emoji: "🗂️" },
        { name: "Connector (relationships, alignment)", emoji: "🔗" },
        { name: "Driver (execution, momentum)", emoji: "🏎️" },
      ],
    },
    {
      title: "Working across cultures, you believe it’s most important to:",
      options: [
        { name: "Follow clear processes and shared standards", emoji: "📐" },
        { name: "Build trust and mutual understanding", emoji: "🤝" },
        { name: "Stay flexible and focus on outcomes", emoji: "🌊" },
      ],
    },
    {
      title: "What challenges you most in global teams?",
      options: [
        { name: "Lack of clarity or structure", emoji: "🧩" },
        { name: "Miscommunication or strained relationships", emoji: "🚧" },
        { name: "Slow decision-making", emoji: "🕰️" },
      ],
    },
    {
      title: "A successful collaboration means:",
      options: [
        { name: "Work is done correctly and consistently", emoji: "🏆" },
        { name: "Everyone feels valued and aligned", emoji: "💖" },
        { name: "Goals are achieved efficiently", emoji: "✔️" },
      ],
    }
  ];

  // Fetch live squads when showing the squads reveal phase to get other users' updates
  useEffect(() => {
    if (phase === "squads-reveal") {
      fetch("https://api.restful-api.dev/objects/ff8081819d150699019d3a30bdf14294", {
        cache: "no-store"
      })
        .then(res => res.json())
        .then(resData => setSquads(Array.isArray(resData?.data) ? resData.data : []))
        .catch(err => console.error("Error fetching squads:", err));
    }
  }, [phase]);

  useEffect(() => {
    let t1, t2, t3, t4;

    const runSequence = () => {
      setPhase("entering");
      t1 = setTimeout(() => setPhase("aiming"), 800);
      t2 = setTimeout(() => setPhase("throwing"), 1600);
      t3 = setTimeout(() => setPhase("impact"), 2800);
      t4 = setTimeout(() => setPhase("finished"), 3500);
    };

    runSequence();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleHuntClick = () => {
    setPhase("transitioning-zoom");
    setTimeout(() => {
      setPhase("transitioning-text");
      // If we already have the trainer name, start the 6s timeout right away
      if (trainerContext) {
        setTimeout(() => setPhase("pre-questions"), 3500);
      }
    }, 1200); // Wait for the iris zoom out to finish
  };

  return (
    <div className="scene-container">
      <div className={`parallax-stage phase-${phase}`}>
        {/* Single Constant Pokémon Battle Background */}
        <div className="environment battle-bg"></div>

        {/* 3D Battle Circles on the ground */}
        <div className="battle-patch player-patch"></div>
        <div className="battle-patch enemy-patch"></div>

        {/* Pikachu (Target) */}
        <div className="pikachu-wrapper">
          {/* Pikachu Electric Charge Up (Aiming/Throwing) */}
          {(phase === "aiming" || phase === "throwing") && (
            <div className="electric-aura">
              <div className="aura-spark e-1"></div>
              <div className="aura-spark e-2"></div>
              <div className="aura-spark e-3"></div>
            </div>
          )}

          {/* Pikachu Thunderbolt Attack */}
          {phase === "throwing" && (
            <div className="thunderbolt-attack">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M95 5 L60 40 L75 40 L30 75 L45 75 L5 100 L30 65 L15 65 L60 25 L45 25 Z"
                  fill="#ffde00"
                />
                <path
                  d="M90 10 L65 37 L75 37 L40 68 L50 68 L15 90 L35 62 L25 62 L60 30 L50 30 Z"
                  fill="#fff"
                />
              </svg>
            </div>
          )}

          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt="Pikachu"
            className="target-pokemon"
          />
          <div className="shadow"></div>
          {phase === "impact" && (
            <>
              <div className="impact-burst"></div>
              <div className="impact-rings">
                <div className="ring r1"></div>
                <div className="ring r2"></div>
                <div className="ring r3"></div>
              </div>
              <div className="impact-sparks">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`spark spark-${i}`}></div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Ash (Trainer) */}
        <div className="trainer-wrapper">
          {/* Ash's Aura Burst on Throw */}
          {phase === "throwing" && <div className="trainer-aura"></div>}

          <div className="trainer-flip">
            <img
              src="/ash_hd.png"
              alt="Pokemon Trainer"
              className="trainer-sprite"
            />
          </div>
          <div className="shadow"></div>
        </div>

        {/* Pokeball projectile */}
        <div className="projectile-wrapper">
          <div className="pokeball">
            <div className="pokeball-top"></div>
            <div className="pokeball-bottom"></div>
            <div className="pokeball-button"></div>
          </div>
          <div className="projectile-shadow"></div>
        </div>

        {/* Title Screen */}
        <div className="title-layer">
          <h1 className="main-title">
            <span className="word w1">CATCH</span>
            <span className="word w2">THAT</span>
            <span className="word w3">PERSONALITY</span>
          </h1>
        </div>
      </div>

      {/* Put UI elements out of the parallax stage so 3D perspective doesn't warp their hit areas */}
      {phase === "finished" && (
        <div className="hunt-button-container">
          <button className="hunt-action-button" onClick={handleHuntClick}>
            <div className="pokeball hunt-mini-ball">
              <div className="pokeball-top"></div>
              <div className="pokeball-bottom"></div>
              <div className="pokeball-button"></div>
            </div>
            <span className="hunt-text">HUNT!</span>
          </button>
        </div>
      )}

      {/* Screen flash on impact */}
      <div
        className={`screen-flash ${phase === "impact" ? "active" : ""}`}
      ></div>

      {/* Starry Transition Overlay */}
      {(phase === "transitioning-zoom" ||
        phase === "transitioning-text" ||
        phase === "pre-questions" ||
        phase === "questions" ||
        phase === "calculating-result" ||
        phase === "final-result" ||
        phase === "pokemon-reveal" ||
        phase === "map-reveal" ||
        phase === "squads-reveal" ||
        phase === "ending-page") && (
          <div className="transition-container">
            {phase === "transitioning-text" && (
              <div className="transition-content">
                <h2 className="transition-text">Let's begin the hunt</h2>
                {!trainerContext ? (
                  <form
                    className="trainer-name-input-container"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (trainerNameInput.trim()) {
                        setTrainerContext(trainerNameInput.trim());
                        setTimeout(() => setPhase("pre-questions"), 3500);
                      }
                    }}
                  >
                    <label htmlFor="trainerName" className="trainer-name-label">
                      Enter your trainer name
                    </label>
                    <input
                      type="text"
                      id="trainerName"
                      className="trainer-name-input"
                      placeholder="e.g. Ash Ketchum"
                      autoComplete="off"
                      autoFocus
                      value={trainerNameInput}
                      onChange={(e) => setTrainerNameInput(e.target.value)}
                    />
                    <button type="submit" className="trainer-submit-btn">
                      Continue
                    </button>
                  </form>
                ) : (
                  <div
                    className="trainer-name-input-container"
                    style={{
                      animationDelay: "0s",
                      opacity: 1,
                      marginTop: "-15px",
                    }}
                  >
                    <h3
                      className="trainer-name-label"
                      style={{
                        color: "#ffde00",
                        textShadow: "0 0 15px rgba(255,222,0,0.4)",
                      }}
                    >
                      Go Catch 'em all, {trainerContext}
                    </h3>
                  </div>
                )}
              </div>
            )}

            {phase === "pre-questions" && (
              <div className="transition-content fade-in-section" style={{ minHeight: "50vh", display: "flex", justifyContent: "center", gap: "15px" }}>
                <h2 className="hp-logo-text" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", textAlign: "center", marginBottom: "0", color: "#ffcb05", padding: "0 20px" }}>
                  Are you the Planner, the Connector, or the Doer?
                </h2>
                <div style={{ color: "#ffffff", textAlign: "center", maxWidth: "90%", width: "1200px", fontSize: "clamp(1rem, 2vw, 1.3rem)", lineHeight: "1.6", marginBottom: "2vh", padding: "0 20px" }}>
                  <strong style={{ color: "#ffde00", letterSpacing: "1px", display: "inline-block", marginBottom: "1vh" }}>Instructions:</strong>
                  <br />
                  Pick the option that feels most like your natural instinct and not what you wish you’d do.
                </div>
                <button
                  className="continue-action-btn"
                  onClick={() => setPhase("questions")}
                  style={{ marginTop: "0", animation: "pulse 2s infinite" }}
                >
                  START HUNT
                </button>
              </div>
            )}

            {phase === "questions" &&
              (() => {
                const currentQ = quizQuestions[currentQuestionIndex];
                return (
                  <div
                    className="question-container"
                    key={`q-container-${currentQuestionIndex}`}
                    style={{ animation: "fade-in-slow 1s ease-out forwards" }}
                  >
                    <h1 className="logo-text-elegant">Catch That Personality</h1>
                    <h3 className="question-title">{currentQ.title}</h3>
                    <div className="carousel-wrapper">
                      <button
                        className="carousel-nav left"
                        onClick={() =>
                          setCarouselIndex(
                            (prev) =>
                              (prev - 1 + currentQ.options.length) %
                              currentQ.options.length,
                          )
                        }
                      >
                        {"<"}
                      </button>
                      <div className="carousel-card">
                        <div
                          className="card-image-placeholder"
                          style={{ animation: "fade-in-slow 0.5s ease-out" }}
                          key={`q${currentQuestionIndex}-${carouselIndex}`}
                        >
                          <span>{currentQ.options[carouselIndex].emoji}</span>
                        </div>
                      </div>
                      <button
                        className="carousel-nav right"
                        onClick={() =>
                          setCarouselIndex(
                            (prev) => (prev + 1) % currentQ.options.length,
                          )
                        }
                      >
                        {">"}
                      </button>
                    </div>
                    <div className="carousel-dots">
                      {currentQ.options.map((_, i) => (
                        <span
                          key={i}
                          className={`dot ${i === carouselIndex ? "active" : ""}`}
                        ></span>
                      ))}
                    </div>
                    <h4 className="card-label">
                      {currentQ.options[carouselIndex].name}
                    </h4>
                    <button
                      className="select-btn"
                      onClick={() => {
                        const newAnswers = [...answers, carouselIndex];
                        setAnswers(newAnswers);
                        if (currentQuestionIndex < quizQuestions.length - 1) {
                          setCurrentQuestionIndex((prev) => prev + 1);
                          setCarouselIndex(0);
                        } else {
                          setPhase("calculating-result");
                          setTimeout(() => setPhase("final-result"), 2000);
                        }
                      }}
                    >
                      {currentQuestionIndex === quizQuestions.length - 1
                        ? "FINISH"
                        : "SELECT"}
                    </button>
                  </div>
                );
              })()}

            {phase === "calculating-result" && (
              <div
                className="transition-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <h1
                  className="logo-text-elegant"
                  style={{ animation: "fade-in-slow 1s infinite alternate" }}
                >
                  Analyzing your cultural personality...
                </h1>
              </div>
            )}

            {phase === "final-result" && (
              <div className="final-result-container fade-in-section" style={{ animation: "fade-in-slow 1.5s ease-out forwards" }}>
                <div className="hp-logo-container">
                  <h2 className="hp-logo-text">Catch that personality</h2>
                </div>

                <div className="sorting-hat-image-container">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/d/dc/Professor_Oak_artwork.png"
                    alt="Professor Oak"
                    className="sorting-hat-img"
                    style={{ maxHeight: "40vh", width: "auto", filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.5))" }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="fallback-emoji">👨‍🔬</div>
                </div>

                <h1 className="sorting-decision-text">
                  Professor Oak has chosen a partner to <br /> accompany you on your cultural personality journey.
                </h1>

                <button className="continue-action-btn" onClick={handleContinue}>
                  CONTINUE
                </button>
              </div>
            )}

            {phase === "pokemon-reveal" && assignedPokemon && (
              <div className="pokemon-reveal-container fade-in-section">
                <div className="crest-image-wrapper">
                  <img
                    src={assignedPokemon.image}
                    alt={assignedPokemon.name}
                    className="crest-image"
                  />
                </div>
                <h1 className="house-title">{assignedPokemon.name.toUpperCase()}</h1>
                <p className="house-description">{assignedPokemon.description}</p>
                {assignedPokemon.tagline && <h3 className="house-tagline" style={{ marginTop: "15px", color: "#ffd700", textShadow: "1px 1px 3px rgba(0,0,0,0.8)", fontSize: "1.2rem", fontWeight: "bold" }}>{assignedPokemon.tagline}</h3>}
                <button className="continue-action-btn" style={{ marginTop: "2rem" }} onClick={() => setPhase("map-reveal")}>
                  CONTINUE
                </button>
              </div>
            )}

            {phase === "map-reveal" && (
              <div className="map-reveal-container fade-in-section">
                <h1 className="logo-text-elegant map-title" style={{ animation: "fade-in-slow 1.5s ease-out forwards" }}>
                  Location of Cultural Personality Gyms
                </h1>

                <div className="map-image-wrapper">
                  <img
                    src="/map.png" /* Make sure to name your attached map image as map.png in the public folder */
                    alt="Map of Personality Gyms"
                    className="map-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://upload.wikimedia.org/wikipedia/commons/4/41/World_map_blank_without_borders.svg";
                    }}
                  />
                </div>

                <button className="continue-action-btn" style={{ marginTop: "3rem" }} onClick={() => setPhase("squads-reveal")}>
                  VIEW SQUADS
                </button>
              </div>
            )}


            {phase === "squads-reveal" && (
              <div className="squads-reveal-container fade-in-section" style={{ width: "90%", maxWidth: "1200px" }}>
                <div className="hp-logo-container">
                  <h2 className="hp-logo-text" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", marginBottom: "2rem" }}>Cultural Personality Squads</h2>
                </div>

                <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1rem" }}>
                  {starterPokemons.map(pokemon => {
                    const squadMembers = squads.filter(p => p.pokemon === pokemon.name);
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

            {phase === "ending-page" && (
              <div className="ending-page-container fade-in-section">
                <div className="hp-logo-container">
                  <h2 className="hp-logo-text" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>Journey Complete</h2>
                </div>
                <h1 className="sorting-decision-text" style={{ maxWidth: "800px", margin: "2rem auto 2rem auto", lineHeight: "1.6" }}>
                  Congratulations, {trainerContext || "Trainer"}!<br /><br />
                  You are now equipped with your culturally aligned Pokémon and the locations of your Gyms.
                  <span style={{ display: "block", marginTop: "1.5rem", color: "#ffd700", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: "bold" }}>
                    Be sure to keep track of your partner and Gym locations—you'll need them as you move forward in your journey!
                  </span>
                </h1>
                <p style={{ maxWidth: "600px", margin: "0 auto 4rem auto", color: "#ccc", fontSize: "1.1rem", lineHeight: "1.6", fontStyle: "italic" }}>
                  Step into the world, embrace your traits, and go catch 'em all!
                </p>
                <button className="continue-action-btn" onClick={() => {
                  setPhase('entering');
                  setTrainerNameInput('');
                  setTrainerContext('');
                  setCurrentQuestionIndex(0);
                  setCarouselIndex(0);
                  setAssignedPokemon(null);
                  setAnswers([]);
                }}>
                  PLAY AGAIN
                </button>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
