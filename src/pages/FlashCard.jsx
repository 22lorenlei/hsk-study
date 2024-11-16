import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

function randomizeFunction(array) {
  let randomizedArray = [...array];
  for (let i = 0; i < array.length - 1; i++) {
    let luckyNumber = Math.floor(Math.random() * array.length);
    if (Math.random() > 0.2) {
      [randomizedArray[i], randomizedArray[luckyNumber]] = [
        randomizedArray[luckyNumber],
        randomizedArray[i],
      ];
    }
  }
  return randomizedArray;
}

function flashCardSet1() {
  const [isVisible, setIsVisible] = useState(false);

  const [currentHSK, setHSKName] = useState("HSK 1");

  const [count, setCount] = useState(0);

  const [hskURL, setHskURL] = useState(hsk1JsonURL);

  const [hskSet, setHskSet] = useState(null);

  const [hskSetOriginal, setOriginalOrderSet] = useState(null);

  useEffect(() => {
    if (!hskURL) {
      return;
    }

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

  const increment = () => {
    if (count < hskSet.length - 1) setCount((count) => count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  };

  const changeHSK = (url, name) => {
    setCount(0);
    setHskURL(url);
    setHSKName(name);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const normalize = () => {
    setHskSet(hskSetOriginal);
  };

  const randomize = () => {
    setHskSet(randomizeFunction(hskSet));
  };

  if (!hskSet) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <Link to="/">
          <button> Go to Home Page </button>
        </Link>
      </div>
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
        <div className="flashcard flashcard-container">
          {!isVisible && (
            <div className="character-font-size">{hskSet[count].hanzi}</div>
          )}
          {isVisible && (
            <div className="character-font-size">{hskSet[count].pinyin}</div>
          )}
        </div>

        <p>
          Card: {count + 1} / {hskSet.length} items
        </p>

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

export default flashCardSet1;
