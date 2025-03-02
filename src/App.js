
import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "/img/card1.png", matched: false },
  { "src": "/img/card2.png", matched: false },
  { "src": "/img/card3.png", matched: false },
  { "src": "/img/card4.png", matched: false },
  { "src": "/img/card5.png", matched: false },
  { "src": "/img/card6.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false)
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)  
    setCards(shuffledCards)
    setTurns(0)
  }


  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //on load show shuffled cards
  useEffect(() => {
    shuffleCards();
  }, []);


  //compare 2 selected cards
  useEffect(() => {    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(),1000)
      }
    }
  }, [choiceOne, choiceTwo]);


  //reset choices & increase turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disabled}
          />
       ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
