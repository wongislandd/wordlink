import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function HowToPlay() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"    
          id="panel1-header"
        >
          <Typography><b>How to play</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Each game revolves around discovering a single target word. Dive into the challenge by submitting your guesses for this word. Each guess you make is evaluated by a sophisticated model that assesses how close your guess is to the target. Remember, the lower your score, the nearer you are to the correct answer! Treat each of your guesses as a clue, guiding you closer to unveiling the right word.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}