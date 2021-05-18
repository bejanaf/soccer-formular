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
    <div>
      <h1>German Soccer Transfer:</h1>
      <Grid>
        <PlayerForm onAddPlayer={addPlayer} />
        <Players>
          {players.map((player) => (
            <PlayerCard player={player} />
          ))}
        </Players>
      </Grid>
    </div>
  );
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1 fr;
  gap: 1rem;
  @media (min-width: 576px) {
    grid-template-columns: 1fr 2fr;
  }
`;
const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
export default App;
