import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayerForm from './PlayerForm';
import PlayerCard from './PlayerCard';
import { saveToLocal, loadFromLocal } from './lib/localStorage';

// useState players to player
export default function Home({ onAddToShoppingCart }) {
  const [players, setPlayers] = useState(loadFromLocal('players') ?? []); // state für die Spieler
  const [playerToEdit, setPlayerToEdit] = useState(null);

  // Vwerbindung zur datenbank über Port 4000
  useEffect(() => {
    fetch('http://localhost:4000/player')
      .then((result) => result.json())
      .then((apiPlayers) => setPlayers(apiPlayers))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    saveToLocal('players', players);
  }, [players]);

  function addPlayer(player) {
    fetch('http://localhost:4000/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
      /* dieser Part wird komplett ersetzt mit, nur Player, weil mit der Datenbank genau gleicher Datensatzbezeichnung
        {
        name: player.name,
        price: player.price,
        free_transfer: player.free_transfer,
        club: player.clubname, //club to clubname
        position: player.position,
        skill: player.skill,
        mail: player.mail,
      } */
    })
      .then((result) => result.json())
      .then((playerSaved) => setPlayers([...players, playerSaved]))
      .catch((error) => console.error(error));
  }

  // neue funktion 3 !!!
  function editPlayer(player) {
    setPlayerToEdit(player);
  }

  // Neue Funktion 1 !!!
  function updateAndSavePlayer(playerToUpdate) {
    const upToDatePlayers = players.filter(
      (player) => player._id !== playerToUpdate._id
    );

    fetch('http://localhost:4000/player/' + playerToUpdate._id, {
      method: 'PUT', // Update
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerToUpdate),
    })
      .then((result) => result.json())
      .then((updatedPlayer) => {
        setPlayers([...upToDatePlayers, updatedPlayer]);
        setPlayerToEdit(null);
      })
      .catch((error) => console.error(error));
  }

  // Neue Funktion Nr. 2 !!!
  function deletePlayer(player) {
    fetch('http://localhost:4000/player/' + player._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.data && response.data._id) {
          const playersToKeep = players.filter(
            (player) => player._id !== response.data._id
          );
          setPlayers(playersToKeep);
        } else {
          console.log(
            'Players could not be deleted, was not found, or something else went wrong.'
          );
        }
      });
  }

  return (
    <Grid>
      <PlayerForm
        onAddPlayer={addPlayer}
        onUpdateAndSavePlayer={updateAndSavePlayer}
        playerToEdit={playerToEdit}
      />
      <Players>
        {players.map((player) => (
          <PlayerCard
            onDeletePlayer={deletePlayer}
            onEditPlayer={editPlayer}
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
