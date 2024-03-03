import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_GAME_IDS_ROUTE } from './RouteConstants';

const GameSelector = ({selectedGameId, onSelectionChange}) => {
    const [ localSelection, setLocalSelection ] = useState(selectedGameId);
    const [ gameIdOptions, setGameIdOptions] = useState([]);


    // this is getting called twice
    useEffect(() => {
        axios.get(GET_GAME_IDS_ROUTE)
          .then(res => {
            if (res.data != null) {
                console.log(res.data)
                setGameIdOptions(res.data)
            }
          }).catch(error => console.log(error))
      }, []
    )

    const handleChange = (event) => {
        setLocalSelection(event.target.value);
    };

    const lockInLocalSelection = () => {
        onSelectionChange(localSelection)
    }

    return (
    <div className='gameSelector'>
      <header className='header'>Select a game to play!</header>
        <FormControl fullWidth>
        <InputLabel id="game-id-select-label">GameId</InputLabel>
        <Select
            labelId="game-id-select-label"
            id="game-id-select"
            value={localSelection ? localSelection : ""}
            label="GameId"
            onChange={e => handleChange(e)}
        >
            {gameIdOptions.map(gameId => {
                return <MenuItem key={gameId} value={gameId}>{gameId}</MenuItem>
            })}
        </Select>
        </FormControl>
        <div className='paddingTop'>
            <Button variant="contained" onClick={(e) => lockInLocalSelection()}>Start</Button>
        </div>
      </div>
    );
  };
  
export default GameSelector;