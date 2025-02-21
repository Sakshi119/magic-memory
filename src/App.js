
import { useState } from 'react';
import './App.css';


const cardImages=[
  {"src":"/img/card1.png"},
  {"src":"/img/card2.png"},
  {"src":"/img/card3.png"},
  {"src":"/img/card4.png"},
  {"src":"/img/card5.png"},
  {"src":"/img/card6.png"}
]
function App() {

const [cards,setCards]= useState([])
const [turns,setTurns]= useState(0)


//shuffle cards
  const shuffleCards =()=>{
    const shuffledCards = [...cardImages, ...cardImages].sort(()=> Math.random() - 0.5).map((card)=>({...card,id:Math.random()}))
    setCards(shuffledCards)
    setTurns(0)
  }

  console.log(cards,turns)

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
}

export default App;
