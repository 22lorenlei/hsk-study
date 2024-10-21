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

i = 0

function flashCardSet1() {
  const hsk1Set = getHSK1Data();
  
  if (!hsk1Set) {
    return <p>Loading...</p>;
  }
  
  return (
    <>
      <div className={flashCardClass}>
        { hsk1Set[i].hanzi }
      </div>
    </>
  )
}

export default flashCardSet1;
