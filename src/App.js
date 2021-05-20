//console.log(event.target.name); // Name des Eingabefeldes
//console.log(event.target.value); // Wert des Eingabefeldes
// value={player.name} hängt den dynamisch erzeugten value an
import { useState } from 'react';
import styled from 'styled-components';
import PlayerForm from './PlayerForm';
import PlayerCard from './PlayerCard';

function App() {
  const [players, setPlayers] = useState([]); // state für die Spieler
  function addPlayer(player) {
    setPlayers([...players, player]); // die Formulareingaben werden hier hineingeschoben
  }
  return (
    <Box>
      <h1>German Soccer Transfer:</h1>
      <Grid>
        <PlayerForm onAddPlayer={addPlayer} />
        <Players>
          {players.map((player) => (
            <PlayerCard player={player} />
          ))}
        </Players>
      </Grid>
    </Box>
  );
}
const Grid = styled.div`
  display: grid;
  gap: 1rem;
  @media (min-width: 576px) {
    grid-template-columns: 1fr 2fr;
  }
  grid-template-columns: 1 fr;
`;
const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
export default App;

const Box = styled.div`
  padding-left: 1rem;

  h1 {
    color: white;
    font-size: 3.5rem;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  }
`;
