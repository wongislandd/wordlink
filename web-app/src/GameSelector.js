import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_GAME_IDS_ROUTE, GET_GAME_DETAILS_ROUTE } from './RouteConstants';

const GameSelector = ({onSelectionChange}) => {
    const [ localSelection, setLocalSelection ] = useState(null);
    const [ gameIdOptions, setGameIdOptions] = useState([]);


    // this is getting called twice
    useEffect(() => {
        axios.get(GET_GAME_IDS_ROUTE)
          .then(res => {
            if (res.data != null) {
                console.log(res.data)
                setGameIdOptions(res.data)
            }
          }).catch(error => {
            console.log(error)
            alert("Could not fetch game list")
          })
      }, []
    )

    const grabSelectedGameDetails= () => {
      axios.get(GET_GAME_DETAILS_ROUTE, {
        params: { gameId: localSelection }
      }).then(res => {
          if (res.data != null) {
              console.log(res.data)
              onSelectionChange(res.data)
          }
        }).catch(error => {
            console.log(error)
            alert("Could not fetch game details")
        }
        )
    }

    const handleChange = (event) => {
        setLocalSelection(event.target.value);
    };

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
            <Button variant="contained" onClick={(e) => grabSelectedGameDetails()}>Start</Button>
        </div>
      </div>
    );
  };
  
export default GameSelector;