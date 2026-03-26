import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [phase, setPhase] = useState("entering"); // 'entering', 'aiming', 'throwing', 'impact', 'finished', 'transitioning-zoom', 'transitioning-text', 'questions', 'calculating-result'
  const [trainerNameInput, setTrainerNameInput] = useState("");
  const [trainerContext, setTrainerContext] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [assignedPokemon, setAssignedPokemon] = useState(null);

  const starterPokemons = [
    {
      name: "Bulbasaur",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      description: "You probably know that Bulbasaur is the very first Pokémon in the Pokédex and carries a plant bulb on its back. But did you know your alignment with Bulbasaur means you have a steady, nurturing cultural personality? You thrive in environments that allow for continuous growth, bringing a calming and dependable presence to your team.",
    },
    {
      name: "Charmander",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      description: "You probably know that Charmander’s tail flame indicates its health and emotions. But did you know your alignment with Charmander reveals a highly passionate and driven cultural personality? Your spirited energy and loyalty mean you tackle challenges head-on, lighting the way for others even in the darkest of times.",
    },
    {
      name: "Squirtle",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      description: "You probably know that Squirtle is a Tiny Turtle Pokémon capable of shooting water with incredible force. But did you know your alignment with Squirtle shows a highly adaptable and resilient cultural personality? You flow easily through changing environments and rely on a strong inner shell to protect your core values when things get tough.",
    }
  ];

  const handleContinue = () => {
    const randomPokemon = starterPokemons[Math.floor(Math.random() * starterPokemons.length)];
    setAssignedPokemon(randomPokemon);
    setPhase("pokemon-reveal");
  };

  const quizQuestions = [
    {
      title: "Which of these environments do you prefer?",
      options: [
        { name: "The Volcano", emoji: "🌋" },
        { name: "The Ocean", emoji: "🌊" },
        { name: "The Forest", emoji: "🌲" },
        { name: "The Cave", emoji: "🦇" },
      ],
    },
    {
      title: "Which trait defines you the most?",
      options: [
        { name: "Bravery", emoji: "⚔️" },
        { name: "Wisdom", emoji: "🦉" },
        { name: "Loyalty", emoji: "🤝" },
        { name: "Passion", emoji: "🔥" },
      ],
    },
    {
      title: "What is your ideal weekend activity?",
      options: [
        { name: "Exploring", emoji: "🗺️" },
        { name: "Resting", emoji: "🛌" },
        { name: "Training", emoji: "🏋️" },
        { name: "Reading", emoji: "📚" },
      ],
    },
    {
      title: "Choose a time of day.",
      options: [
        { name: "Dawn", emoji: "🌅" },
        { name: "Noon", emoji: "☀️" },
        { name: "Dusk", emoji: "🌇" },
        { name: "Midnight", emoji: "🌌" },
      ],
    },
    {
      title: "Pick a companion.",
      options: [
        { name: "Fierce Dragon", emoji: "🐉" },
        { name: "Loyal Hound", emoji: "🐕" },
        { name: "Wise Owl", emoji: "🦉" },
        { name: "Playful Monkey", emoji: "🐒" },
      ],
    },
    {
      title: "Which weather speaks to your soul?",
      options: [
        { name: "Thunderstorm", emoji: "⛈️" },
        { name: "Clear Sky", emoji: "🌤️" },
        { name: "Snowy", emoji: "🌨️" },
        { name: "Foggy", emoji: "🌫️" },
      ],
    },
    {
      title: "What's your preferred approach to an obstacle?",
      options: [
        { name: "Charge head-on", emoji: "🏃" },
        { name: "Find a way around", emoji: "🧗" },
        { name: "Study it deeply", emoji: "🔎" },
        { name: "Ask for help", emoji: "🗣️" },
      ],
    },
    {
      title: "Pick a color palette.",
      options: [
        { name: "Crimson Red", emoji: "🔴" },
        { name: "Deep Ocean Blue", emoji: "🔵" },
        { name: "Forest Green", emoji: "🟢" },
        { name: "Shadow Black", emoji: "⚫" },
      ],
    },
    {
      title: "What kind of music soothes you?",
      options: [
        { name: "Upbeat Pop", emoji: "🥁" },
        { name: "Classical Strings", emoji: "🎻" },
        { name: "Nature Sounds", emoji: "🍃" },
        { name: "Lo-fi Beats", emoji: "📻" },
      ],
    },
    {
      title: "Choose a magical artifact.",
      options: [
        { name: "Wand", emoji: "🪄" },
        { name: "Crystal Ball", emoji: "🔮" },
        { name: "Ancient Sword", emoji: "🗡️" },
        { name: "Invisibility Cloak", emoji: "🧥" },
      ],
    },
    {
      title: "What's your biggest fear?",
      options: [
        { name: "Failure", emoji: "📉" },
        { name: "Isolation", emoji: "🚪" },
        { name: "The Unknown", emoji: "❓" },
        { name: "Betrayal", emoji: "💔" },
      ],
    },
    {
      title: "How do you celebrate a victory?",
      options: [
        { name: "Loud Party", emoji: "🎉" },
        { name: "Quiet Reflection", emoji: "🍵" },
        { name: "Next Challenge", emoji: "🚀" },
        { name: "Sharing with friends", emoji: "🥂" },
      ],
    },
  ];

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
        setTimeout(() => setPhase("questions"), 2000);
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
        phase === "questions" ||
        phase === "calculating-result" ||
        phase === "final-result" ||
        phase === "pokemon-reveal" ||
        phase === "map-reveal" ||
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
                        setTimeout(() => setPhase("questions"), 2000);
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

                <button className="continue-action-btn" style={{ marginTop: "3rem" }} onClick={() => setPhase("ending-page")}>
                  FINISH
                </button>
              </div>
            )}

            {phase === "ending-page" && (
              <div className="ending-page-container fade-in-section">
                <div className="hp-logo-container">
                  <h2 className="hp-logo-text" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>Journey Complete</h2>
                </div>
                <h1 className="sorting-decision-text" style={{ maxWidth: "800px", margin: "2rem auto 4rem auto", lineHeight: "1.6" }}>
                  Congratulations, {trainerContext || "Trainer"}! You are now equipped with your culturally aligned Pokémon and the locations of your Gyms. Step into the world, embrace your traits, and go catch 'em all!
                </h1>
                <button className="continue-action-btn" onClick={() => window.location.reload()}>
                  PLAY AGAIN
                </button>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
