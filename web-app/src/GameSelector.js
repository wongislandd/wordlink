import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_GAME_IDS_ROUTE } from './RouteConstants';

const GameSelector = () => {
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [gameIdOptions, setGameIdOptions] = useState([]);

    useEffect(() => {
        axios.get(GET_GAME_IDS_ROUTE)
          .then(res => {
            const persons = res.data;
            this.setState({ persons });
          })
      }
    )

    const handleChange = (event) => {
        setSelectedGameId(event.target.value);
    };

    return (
      <div className='gameSelector'>
        <FormControl fullWidth>
        <InputLabel id="game-id-select-label">Age</InputLabel>
        <Select
            labelId="game-id-select-label"
            id="game-id-select"
            value={selectedGameId ? selectedGameId : ""}
            label="GameId"
            onChange={handleChange}
        >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>
      </div>
    );
  };
  
export default GameSelector;