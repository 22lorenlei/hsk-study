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

function flashCardSet1() {
  const [isVisible, setIsVisible] = useState(false);

  const [currentHSK, setHSKName] = useState("HSK 1");

  const [count, setCount] = useState(0);

  const [hskURL, setHskURL] = useState(hsk1JsonURL);

  const [hskSet, setHskSet] = useState(null);

  useEffect(() => {
    if (!hskURL) {
      return;
    }

    fetch(hskURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setHskSet(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [hskURL]);

  const increment = () => {
    if (count < hskSet.length) setCount((count) => count + 1);
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

  if (!hskSet) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="centerContent">
        <div>Showing vocabulary for {currentHSK}</div>
        <button onClick={toggleVisibility}>
          {isVisible ? "Hide" : "Show"}
        </button>
        <button onClick={increment}>Go next</button>
        <button onClick={decrement}>Go back</button>
        {!isVisible && (
          <div className="characterFontSize">{hskSet[count].hanzi}</div>
        )}
        {isVisible && (
          <div className="characterFontSize">{hskSet[count].pinyin}</div>
        )}

        <p>
          Card: {count} / {hskSet.length} items
        </p>

        <div>
          <button onClick={() => changeHSK(hsk1JsonURL, "HSK 1")}>HSK1</button>
          <button onClick={() => changeHSK(hsk2JsonURL, "HSK 2")}>HSK2</button>
          <button onClick={() => changeHSK(hsk3JsonURL, "HSK 3")}>HSK3</button>
          <button onClick={() => changeHSK(hsk4JsonURL, "HSK 4")}>HSK4</button>
          <button onClick={() => changeHSK(hsk5JsonURL, "HSK 5")}>HSK5</button>
          <button onClick={() => changeHSK(hsk6JsonURL, "HSK 6")}>HSK6</button>
        </div>
        <div>
          <Link to="/">
            <button> Go to Home Page </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default flashCardSet1;
