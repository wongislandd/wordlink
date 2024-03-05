import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const GameInfo = ({selectedGameDetails}) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
        <ListItem>
          <ListItemText primary="GameId" secondary={selectedGameDetails.gameId} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Known associations" secondary={selectedGameDetails.totalAssociations} />
        </ListItem>
      </List>
    );
  }
  
export default GameInfo;