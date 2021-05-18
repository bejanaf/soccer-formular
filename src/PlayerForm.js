import styled from 'styled-components/macro';
import { useState } from 'react';
import Tags from './Tag';
//import Soccerfieldimg from '../src/images/soccerfield.png';
export default function PlayerForm({ onAddPlayer }) {
  const initialPlayerState = {
    //anlegen eines Prototyps für alle properties (key)
    name: '',
    price: '',
    free_transfer: false,
    position: '',
    email: '',
    club: '',
    skills: [],
  };
  const [player, setPlayer] = useState(initialPlayerState);

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
    onAddPlayer(player);
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
      <h3>Add a new Player</h3>
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
        <option value="fc_bayern">FC Bayern</option>
        <option value="sv_werder">SV Werder</option>
        <option value="vfb_stuttgart">VFB Stuttgart</option>
        <option value="rb_leipzig">RB Leipzig</option>
        <option value="st_pauli">FC St. Pauli</option>
        <option value="fc_koeln">1. FC Köln</option>
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
      <label htmlFor="email">Contact</label>
      <input
        type="text"
        name="email"
        value={player.email}
        onChange={updatePlayer}
      />
      <Buttons>
        <Button isPrimary type="submit">
          Add player
        </Button>
        <Button onClick={() => setPlayer(initialPlayerState)} type="reset">
          Cancel
        </Button>
      </Buttons>
    </Form>
  );
}
const Form = styled.form`
  display: grid;
  gap: 0.5rem;
  margin: 0 auto;
  label {
    font-weight: bold;
    font-size: 20px;
    color: green;
  }
  input,
  select {
    font-size: 1.25rem;
  }
  input[type='checkbox'],
  input[type='radio'] {
    transform: scale() (1.4);
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
  padding: 1rem;
  border-radius: 5rem;
  background: white;
  cursor: pointer;
`;
