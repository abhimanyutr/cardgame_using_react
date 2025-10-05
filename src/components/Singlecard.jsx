import React from 'react'
import "./stylesinglecard.css"; // exact filename (case-sensitive)
import { Box, Stack, Button } from '@mui/material';
function Singlecard({card,handleChoice,flipped,disabled}) {

    const handleClick = ()=>{
        if(!disabled){
             handleChoice(card)
        }
       
    }


  return (
    
       <div
    className={`card ${flipped ? "flipped" : ""}`}
    onClick={handleClick}  // Optional: move click to whole card
    key={card.id}
  >
    <img className="front" src={card.src} alt="card front" />
    <img className="back" src="/images/coverImg.jpg" alt="card back" />
  </div>
    
  )
}

export default Singlecard
