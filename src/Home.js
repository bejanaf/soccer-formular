import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayerForm from './PlayerForm';
import PlayerCard from './PlayerCard';
import { saveToLocal, loadFromLocal } from './lib/localStorage';

export default function Home({ onAddToShoppingCart }) {
  const [players, setPlayers] = useState(loadFromLocal('players') ?? []); // state für die Spieler

  useEffect(() => {
    saveToLocal('players', players);
  }, [players]);

  function addPlayer(player) {
    setPlayers([...players, player]); // die Formulareingaben werden hier hineingeschoben
  }

  return (
    <Grid>
      <PlayerForm onAddPlayer={addPlayer} />
      <Players>
        {players.map((player) => (
          <PlayerCard
            player={player}
            onAddToShoppingCart={onAddToShoppingCart}
          />
        ))}
      </Players>
    </Grid>
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
