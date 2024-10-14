import '../css/styles.css'
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

function FlashCard() {
  let hsk1Set
  const [showHsk1Set, setHsk1Data] = useState();  
  fetch('https://raw.githubusercontent.com/clem109/hsk-vocabulary/refs/heads/master/hsk-vocab-json/hsk-level-1.json')
  .then((response) => response.json())
  .then((responseJson) => {
    hsk1Set = responseJson.map(function(data) {
      console.log(data.hanzi);
      return(<>
      <p> Hanzi: {data.hanzi} </p>
      <p> Pinyin: {data.pinyin} </p>
      </>
      )
    })
    setHsk1Data(hsk1Set)
  })
  .catch((error) => {
    console.error(error);
  });
  return (
    <>
    <h1 className="center-content"> This is the Flash Card Page </h1>
    {showHsk1Set}
    <Link to="/">
      <button> Go to home page </button>
    </Link>
    </>
  )
}
  
export default FlashCard