import { Box, Stack, Button } from '@mui/material';
import React from 'react'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import './App.css';
import { useEffect, useState } from 'react';
import Singlecard from './components/Singlecard';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinearProgress from '@mui/material/LinearProgress'; 
import { Modal, Typography } from '@mui/material';
const cardImages = [
  { src: "/images/bird2.jpg",matched:false },
  { src: "/images/cat2.jpg",matched:false },
  { src: "/images/fish.jpeg",matched:false },
  { src: "/images/birds.jpg",matched:false },
  { src: "/images/catdog.jpg",matched:false },
  { src: "/images/snake.jpg",matched:false },
  { src: "/images/fighter.jpg",matched:false },
  { src: "/images/butterfly.jpg",matched:false }
];

function App() {
   const [value, setValue] = React.useState(0);

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  //For user card choice
  const[choiseOne,setChoiceOne]=useState(null);
  const[choicetwo,setChoiceTwo]=useState(null);

  const[disabled,setDisabled]=useState(false)

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  console.log(cards, turns);

  //To handle Choice
  const handleChoice = (card)=>{
     console.log(card);
     choiseOne ? setChoiceTwo(card):setChoiceOne(card);
     
  }
  //Compare selected  2 cards
  useEffect(()=>{
   
    if(choiseOne && choicetwo)
    {
      setDisabled(true);
      if(choiseOne.src === choicetwo.src)
      {
        console.log("Card match ✅");
        setCards(prevCard=>{
          return prevCard.map(card=>{
            if(card.src === choicetwo.src)
            {
              return{...card,matched:true}
            }
            else{
              //No need to update 
               return card
            }
            
          })
        })
        resetTurns();
      }
      else{
       
        console.log("Those cards do not match");
        setTimeout(()=>resetTurns(),1000)  ;
      }
    }
    },[choiseOne,choicetwo])
 
  useEffect(() => {
  if (cards.length > 0 && cards.every(card => card.matched)) {
    setGameOver(true);
    // setTimeout(()=>alert("Congragulation"),1000)
    
  }
}, [cards]);

  //To rESET cards and count the turns
  const resetTurns = ()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <>
      <Box>
        <Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    paddingY: "2px"
  }}
>
  <h1 className="head">Card Match</h1>
  <Button
    variant="outlined"
    startIcon={<ArrowForwardIosOutlinedIcon />}
    onClick={shuffleCards}
  >
    Start game
  </Button>
</Stack>

<div className='card-grid'
  direction="column"
  spacing={1}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
  {cards.map(card => (
    <Singlecard 
               key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiseOne || card === choicetwo || card.matched }
                disabled={disabled}
    />
  ))}

      </div>



       <Box  sx={{ position: 'absolute', bottom: 16, right: 16,width:"240px" }}>
     
    </Box>
   <Box sx={{width:"200px", position: 'absolute', bottom: 16, right: 16 }}>
    <h3 className='head' style={{textAlign:"center"}}>Moves : {turns}</h3>
      <LinearProgress />
    </Box>

      </Box>

  {/* Modal */}
  <Modal
  open={gameOver}
  onClose={() => setGameOver(false)}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box 
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      
      borderRadius: 2,
      boxShadow: 24,
      fontWeight: "bold",
      p: 4,
      textAlign: 'center',
      color:"white",
     
    }}
  >
    <Typography  id="modal-title" variant="h4" component="h2" sx={{fontWeight:"bold" }}>
       Congratulations! 
    </Typography>
    <Typography id="modal-description" sx={{ mt: 2,fontWeight:"bold" }}>
      You finished the game in {turns} moves.
    </Typography>
    <Button 
      variant="outlined" 
      sx={{ mt: 3 }}
      onClick={() => {
        shuffleCards();
        setGameOver(false);
      }}
    >
      Play Again
    </Button>
  </Box>
</Modal>


    </>
  );
}

export default App;
