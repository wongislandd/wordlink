import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { GET_GAME_IDS_ROUTE, GET_GAME_DETAILS_ROUTE } from '../../../router/RouteConstants';
import GameStateContext from '../../../provider/game-state/GameStateContext';
import './game-selector.scss';

const GameSelector = ({ onSelectionChange }) => {
  const [localSelection, setLocalSelection] = useState(null);
  const [gameIdOptions, setGameIdOptions] = useState([]);
  const { setLoading } = useContext(GameStateContext)


  // this is getting called twice
  useEffect(() => {
    setLoading(true)
    axios.get(GET_GAME_IDS_ROUTE)
      .then(res => {
        if (res.data != null) {
          setGameIdOptions(res.data)
        }
      }).catch(error => {
        alert("Could not fetch game list")
      }).finally(() => setLoading(false))
  }, [setLoading]
  )

  const grabSelectedGameDetails = () => {
    setLoading(true)
    axios.get(GET_GAME_DETAILS_ROUTE, {
      params: { gameId: localSelection - 1 }
    }).then(res => {
      if (res.data != null) {
        onSelectionChange(res.data)
      }
    }).catch(error => {
      alert("Could not fetch game details")
    }
    ).finally(() => setLoading(false))
  }

  const handleChange = (event) => {
    setLocalSelection(event.target.value);
  };

  return (
    <div className='game-selector'>
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
            return <MenuItem key={gameId + 1} value={gameId + 1}>{gameId + 1}</MenuItem>
          })}
        </Select>
      </FormControl>
      <div className='padding-top'>
        <Button variant="contained" onClick={(e) => grabSelectedGameDetails()} className="game-selector__button">Start</Button>
      </div>
    </div>
  );
};

export default GameSelector;