import React, { useState, useEffect } from 'react';

function getHSK1Data() {
  const [hsk1Set, setHsk1Set] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-1.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setHsk1Set(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return hsk1Set;
}

function flashCardSet1() {
  const hsk1Set = getHSK1Data();

  const [isVisible, setIsVisible] = useState(false);

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }
  
  if (!hsk1Set) {
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
      {isVisible && (
        <div>
          { hsk1Set[count].hanzi }
        </div>
      )}
      {!isVisible && (
        <div>
          { hsk1Set[count].pinyin }
        </div>
      )}
    </>
  )
}

export default flashCardSet1;
