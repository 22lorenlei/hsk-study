import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// All the HSK links
let hsk1JsonURL =
  "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-1.json";
let hsk2JsonURL =
  "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-2.json";
let hsk3JsonURL =
  "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-3.json";
let hsk4JsonURL =
  "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-4.json";
let hsk5JsonURL =
  "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-5.json";
let hsk6JsonURL =
  "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-6.json";

// Randomize function used for randomizing HSK flashcard sets
function randomizeFunction(array) {
  let randomizedArray = [...array];
  for (let i = 0; i < array.length - 1; i++) {
    let luckyNumber = Math.floor(Math.random() * array.length);

    // Swap current position with a random position 80% of the time
    if (Math.random() > 0.2) {
      [randomizedArray[i], randomizedArray[luckyNumber]] = [
        randomizedArray[luckyNumber],
        randomizedArray[i],
      ];
    }
  }
  return randomizedArray;
}

// Main flash card app
function flashCardSet() {
  // This is used for the pinyin and character flip
  const [isVisible, setIsVisible] = useState(false);

  // This is used for the label for which HSK set we are on
  const [currentHSK, setHSKName] = useState("HSK 1");

  // How we keep track which card we are on. Starts at 0 auto
  const [count, setCount] = useState(0);

  // This is how we switch between HSK set JSON url to switch sets. This starts at HSK1 set rul
  const [hskURL, setHskURL] = useState(hsk1JsonURL);

  // hskSet is the actual json that we get from the given json url
  const [hskSet, setHskSet] = useState(null);

  // This is the pristine set we keep (in regular order) for the normalize function
  const [hskSetOriginal, setOriginalOrderSet] = useState(null);

  // Updates if hskURL changes, so if you change the hsk set
  useEffect(() => {
    // In case it doesn't load in time
    if (!hskURL) {
      return;
    }

    // Get that hsk URL and set it to the working hskSet. Also save a pristine version for the unordered set.
    fetch(hskURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setHskSet(responseJson);
        setOriginalOrderSet(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [hskURL]);

  // Go up by one card
  const increment = () => {
    if (count < hskSet.length - 1) setCount((count) => count + 1);
  };

  // Go down by one card
  const decrement = () => {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  };

  // This is used to change our HSK (changes url and name)
  // Resets card to 0
  const changeHSK = (url, name) => {
    setCount(0);
    setHskURL(url);
    setHSKName(name);
  };

  // This is just to flip visibility for our pinyin and characters
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // This is to have it in the original order
  const normalize = () => {
    setHskSet(hskSetOriginal);
  };

  // This is to randomize the hskSet
  const randomize = () => {
    setHskSet(randomizeFunction(hskSet));
  };

  // If somehow the hskSet isn't there
  if (!hskSet) {
    return <p>Loading...</p>;
  }

  // What we see
  return (
    <>
      {/* General Navigational buttons */}
      <div>
        <Link to="/">
          <button> Go to Home Page </button>
        </Link>
      </div>

      {/* Flash Card App Buttons - Navigational */}
      <div className="app-container">
        <div>Showing vocabulary for {currentHSK}</div>
        <div className="flashcard-button-div">
          <button onClick={toggleVisibility}>
            {isVisible ? "Hide" : "Show"}
          </button>
          <button onClick={increment}>Go next</button>
          <button onClick={decrement}>Go back</button>
          <button onClick={randomize}>Randomize</button>
          <button onClick={normalize}>Normalize</button>
        </div>

        {/* This is the flash card content */}
        <div className="flashcard flashcard-container">
          {!isVisible && (
            <div className="character-font-size">{hskSet[count].hanzi}</div>
          )}
          {isVisible && (
            <div className="character-font-size">{hskSet[count].pinyin}</div>
          )}
        </div>

        {/* Helpful card count info */}
        <p>
          Card: {count + 1} / {hskSet.length} items
        </p>
        
        {/* HSK set navigation */}
        <div>
          <button onClick={() => changeHSK(hsk1JsonURL, "HSK 1")}>HSK1</button>
          <button onClick={() => changeHSK(hsk2JsonURL, "HSK 2")}>HSK2</button>
          <button onClick={() => changeHSK(hsk3JsonURL, "HSK 3")}>HSK3</button>
          <button onClick={() => changeHSK(hsk4JsonURL, "HSK 4")}>HSK4</button>
          <button onClick={() => changeHSK(hsk5JsonURL, "HSK 5")}>HSK5</button>
          <button onClick={() => changeHSK(hsk6JsonURL, "HSK 6")}>HSK6</button>
        </div>
      </div>
    </>
  );
}

export default flashCardSet;
