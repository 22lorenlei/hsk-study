import '../css/styles.css'
import {Link} from 'react-router-dom' 

function Home() {

  return (
    <>
    <h1 className="center-content"> This is the main page </h1>
    <Link to="/flashcard">
      <button> Go to Flash Card page </button>
    </Link>
    </>
  )
}

export default Home
