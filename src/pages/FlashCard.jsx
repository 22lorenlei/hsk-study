import React, { useState, useEffect } from 'react';

let hsk1JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-1.json";

let hsk2JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-2.json";

let hsk3JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-3.json";

let hsk4JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-4.json";

let hsk5JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-5.json";

let hsk6JsonURL = "https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-6.json";

function flashCardSet1() {

  const [isVisible, setIsVisible] = useState(false);

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
    if (count < hskSet.length)
    setCount(count => count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count => count - 1);
    }
  }

  const changeHSK = (url) => {
    setCount(0);
    setHskURL(url);
  };

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
      <button onClick={() => changeHSK(hsk1JsonURL)}>
        HSK1
      </button>
      <button onClick={() => changeHSK(hsk2JsonURL)}>
        HSK2
      </button>
      <button onClick={() => changeHSK(hsk3JsonURL)}>
        HSK3
      </button>
      <button onClick={() => changeHSK(hsk4JsonURL)}>
        HSK4
      </button>
      <button onClick={() => changeHSK(hsk5JsonURL)}>
        HSK5
      </button>
      <button onClick={() => changeHSK(hsk6JsonURL)}>
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
      
      <p> Card: { count } / { hskSet.length } </p>
    </>
  )
}

export default flashCardSet1;
