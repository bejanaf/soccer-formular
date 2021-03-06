import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';
import Tags from './Tag';
import validatePlayer from './lib/Validation';

export default function PlayerForm({
  onAddPlayer,
  onUpdateAndSavePlayer,
  playerToEdit,
}) {
  const initialPlayerState = {
    //anlegen eines Prototyps für alle properties (key)
    name: '',
    price: '',
    free_transfer: false,
    position: '',
    mail: '',
    club: '',
    skills: [],
  };
  const [player, setPlayer] = useState(initialPlayerState);
  const [isError, setIsError] = useState(false);
  const [clubs, setClubs] = useState([]);
  // Thomas club... also aufpassen mit clubs!

  useEffect(() => {
    fetch('http://localhost:4000/club')
      .then((result) => result.json())
      .then((clubsFromApi) => setClubs(clubsFromApi))
      .catch((error) => console.error(error));
  }, []);

  // neuer use EFFECT
  useEffect(() => {
    if (playerToEdit) {
      setPlayer(playerToEdit);
    }
  }, [playerToEdit]);

  // Oberhalb die Validierung
  function updatePlayer(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;

    if (event.target.type === 'checkbox') {
      // checkbox übermittelt keinen value, deshalb immer im State speichern
      fieldValue = event.target.checked; // ist true oder false
    }
    setPlayer({ ...player, [fieldName]: fieldValue }); // property (key) dynamisch erzeugt, deshalb []
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (validatePlayer(player)) {
      playerToEdit ? onUpdateAndSavePlayer(player) : onAddPlayer(player);
      setPlayer(initialPlayerState);
      /*       onAddPlayer(player);
      setPlayer(initialPlayerState); // alter Code, nun neuer Code oben */
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  function updateSkills(skillToUpdate) {
    setPlayer({
      ...player,
      skills: [...player.skills, skillToUpdate.toUpperCase()],
    });
  }

  function removeTags(tagToRemove) {
    const remainingSkill = player.skills.filter(
      (skill) => skill !== tagToRemove
    );
    setPlayer({ ...player, skills: [...remainingSkill] });
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <h3>{playerToEdit ? 'Edit' : 'Add'} Player</h3>
      {isError && <ErrorBox>You have an Error in your Form!</ErrorBox>}
      <label>Player Name</label>
      <input
        type="text"
        name="name"
        onChange={updatePlayer}
        value={player.name}
      />

      <label>Transfer Price</label>
      <input
        type="text"
        name="price"
        onChange={updatePlayer}
        value={player.price}
        disabled={player.free_transfer ? true : false}
      />

      <label>On a free transfer</label>
      <input
        type="checkbox"
        name="free_transfer"
        onChange={updatePlayer}
        value={player.free_transfer}
        disabled={player.price !== ''}
      />

      <label htmlFor="club">Club</label>
      <select id="club" name="club" onChange={updatePlayer} value={player.club}>
        <option value="select"> ---Please select --- </option>
        {clubs &&
          clubs.length > 0 &&
          clubs.map((club) => (
            <option key={club._id} value={club.clubname}>
              {club.clubname}
            </option>
          ))}
      </select>
      <label htmlFor="position">Position</label>
      <Position>
        <label>
          <input
            type="radio"
            value="striker"
            name="position"
            onChange={updatePlayer}
            checked={player.position === 'striker'}
          />{' '}
          Striker
        </label>
        <label>
          <input
            type="radio"
            value="midfield"
            name="position"
            onChange={updatePlayer}
            checked={player.position === 'midfield'}
          />{' '}
          Midfield
        </label>
        <label>
          <input
            type="radio"
            value="defence"
            name="position"
            onChange={updatePlayer}
            checked={player.position === 'defence'}
          />{' '}
          Defense
        </label>
        <label>
          <input
            type="radio"
            value="goalie"
            name="position"
            onChange={updatePlayer}
            checked={player.position === 'goalie'}
          />{' '}
          Goalie
        </label>
      </Position>
      <Tags
        toDelete={removeTags}
        onUpdateTags={updateSkills}
        tags={player.skills}
      />
      <label htmlFor="mail">Contact</label>
      <input
        type="text"
        name="mail"
        value={player.mail}
        onChange={updatePlayer}
      />
      <Buttons>
        <Button isPrimary>{playerToEdit ? 'Update' : 'Add'} player</Button>
        <Button type="reset" onClick={() => setPlayer(initialPlayerState)}>
          Cancel
        </Button>
      </Buttons>
    </Form>
  );
}
const Form = styled.form`
  border: 3px white solid;
  display: grid;
  gap: 0.5rem;
  margin: 0 auto;
  margin-bottom: 0.6rem;
  padding: 1.5rem;

  h3 {
    text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;
  }

  label {
    font-size: 20px;
    font-weight: bold;
    text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;
  }
  input,
  select {
    font-size: 1.25rem;
  }
  input[type='checkbox'] {
    transform: scale(1.8);
  }
  input[type='radio'] {
    transform: scale(1.3);
    margin-bottom: 0.4rem;
  }
`;
const Position = styled.section`
  display: flex;
  gap: 1rem;
`;
const Buttons = styled.section`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
`;
const Button = styled.button`
  background: white;
  border-radius: 1rem;
  cursor: pointer;
  padding: 1rem;
`;

const ErrorBox = styled.div`
  background: hsl(330, 60%, 50%);
  color: hsl(330, 95%, 95%);
  padding: 1rem;
  border-radius: 0.5rem;
`;
