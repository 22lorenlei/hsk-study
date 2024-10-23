import React, { useState, useEffect } from 'react';

let hsk1JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-2.json";

let hsk2JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-2.json";

let hsk3JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-3.json";

let hsk4JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-4.json";

let hsk5JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-5.json";

let hsk6JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-6.json";

function getHSK1Data(chosenURL) {
  let [hskSet, setHskSet] = useState(null);
  useEffect(() => {
    fetch(chosenURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setHskSet(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(hskSet);
  return hskSet;
}

function flashCardSet1() {

  const [isVisible, setIsVisible] = useState(false);

  const [count, setCount] = useState(0);

  const [hskURL, setHskURL] = useState(hsk1JsonURL);

  let hskSet = getHSK1Data(hskURL);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  }

  const changeHSK1 = () => {
    setCount(0);
    setHskURL(hsk1JsonURL)
  }

  const changeHSK2 = () => {
    setCount(0);
    setHskURL(hsk2JsonURL);
  }

  const changeHSK3 = () => {
    setCount(0);
    setHskURL(hsk3JsonURL);
  }

  const changeHSK4 = () => {
    setCount(0);
    setHskURL(hsk4JsonURL);
  }

  const changeHSK5 = () => {
    setCount(0);
    setHskURL(hsk5JsonURL);
  }

  const changeHSK6 = () => {
    setCount(0);
    setHskURL(hsk6JsonURL);
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }
  
  if (!hskSet) {
    return <p>Loading...</p>;
  }
  
  return (
    <>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      <button onClick={increment}>
          Go next
      </button>
      <button onClick={decrement}> 
          Go back
      </button>
      <button onClick={changeHSK1}>
        HSK1
      </button>
      <button onClick={changeHSK2}>
        HSK2
      </button>
      <button onClick={changeHSK3}>
        HSK3
      </button>
      <button onClick={changeHSK4}>
        HSK4
      </button>
      <button onClick={changeHSK5}>
        HSK5
      </button>
      <button onClick={changeHSK6}>
        HSK6
      </button>
      {isVisible && (
        <div>
          { hskSet[count].hanzi }
        </div>
      )}
      {!isVisible && (
        <div>
          { hskSet[count].pinyin }
        </div>
      )}
    </>
  )
}

export default flashCardSet1;
