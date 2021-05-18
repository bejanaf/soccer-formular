import { useState } from 'react';
import styled from 'styled-components/macro';

function App() {
  const initialPlayerState = {
    name: '',
    price: '',
    free_transfer: false,
    club: '',
    position: '',
    email: '',
  };

  const [player, setPlayer] = useState(initialPlayerState);

  function updatePlayer(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;

    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    }
    //   wir brauchen if weil checkbox standardmäßig keinen Wert übermittelt wenn sie nicht geklickt wird
    //   hier wird definiert, dass sie auf jeden Fall einen Wert übermittelt
    // und zwar den Zustand der checkbox (checked oder nicht)

    setPlayer({ ...player, [fieldName]: fieldValue });
  }

  function addPlayer(event) {
    event.preventDefault();
    console.log(player, 'State');
  }

  return (
    <main>
      <h1>Add a new player</h1>

      <Formular onSubmit={addPlayer}>
        <label htmlFor="name">Player Name</label>
        <input
          type="text"
          name="name"
          onChange={updatePlayer}
          value={player.name} //vorbelegt falls es Wert gibt
        />

        <label htmlFor="price">Transfer Price (in €)</label>
        <input
          type="name"
          name="price"
          onChange={updatePlayer}
          value={player.price} //vorbelegt falls es Wert gibt
          disabled={player.free_transfer}
          //wenn die checkbox free_transfer checked (true) ist, ist disabled true
        />
        <label>
          <input
            type="checkbox"
            name="free_transfer"
            onChange={updatePlayer}
            value={player.free_transfer}
            disabled={player.price !== ''}
            // disabled wenn ein Preis eingegeben wurde, also kein leerer String ist
          />
          <span>Free transfer?</span>
        </label>

        <label htmlFor="club">Club</label>
        <select
          name="club"
          id="club"
          onChange={updatePlayer}
          value={player.club}
        >
          <option value="">Please select</option>
          <option value="fc_bayern">FC Bayern</option>
          <option value="sv_werder">SV Werder Bremen</option>
          <option value="vfb_stuttgart">VFB Stuttgart</option>
          <option value="rb_leipzig">RB Leipzig</option>
          <option value="hansa_rostock">Hansa Rostock</option>
          <option value="eintracht_frankfurt">Eintracht Frankfurt</option>
          <option value="fc_st_pauli">FC St. Pauli</option>
        </select>

        <fieldset>
          <legend>Position</legend>
          <label>
            <input
              type="radio"
              name="position"
              value="striker"
              onChange={updatePlayer}
              checked={player.position === 'striker'}
            />
            Striker
          </label>

          <label htmlFor="">
            <input
              type="radio"
              name="position"
              value="midfield"
              onChange={updatePlayer}
              checked={player.position === 'midfield'}
            />
            Midfield
          </label>

          <label htmlFor="">
            <input
              type="radio"
              name="position"
              value="defence"
              onChange={updatePlayer}
              checked={player.position === 'defence'}
            />
            Defence
          </label>

          <label htmlFor="">
            <input
              type="radio"
              name="position"
              value="goalie"
              onChange={updatePlayer}
              checked={player.position === 'goalie'}
            />
            Goalie
          </label>
        </fieldset>
        <label htmlFor="email">Contact Email</label>
        <input
          type="text"
          name="email"
          onChange={updatePlayer}
          value={player.email}
        />

        <Button isPrimary>Add</Button>
        <Button type="reset" onClick={() => setPlayer(initialPlayerState)}>
          Cancel
        </Button>
      </Formular>
    </main>
  );
}

export default App;

const Formular = styled.form`
  display: grid;
  gap: 0.5rem;
  margin: 0 auto;
  max-width: 25rem;
  label,
  legend {
    font-weight: bold;
    span {
      font-weight: normal;
    }
  }
  legend {
    margin-bottom: 0.5rem;
    padding: 0;
  }
  input,
  select {
    padding: 0.5rem;
    margin-bottom: 0.3rem;
  }
  fieldset {
    border: none;
    display: flex;
    gap: 0.4rem;
    padding: 0;
    margin: 0;
  }
  fieldset > label {
    font-weight: normal;
  }
  input[type='radio'],
  input[type='checkbox'] {
    transform: scale(1.5);
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 1.5rem;
  border-radius: 0.4rem;
  border: none;
  background: ${(props) => (props.isPrimary ? 'hotpink' : 'grey')};
  cursor: pointer;
  font-weight: ${(props) => (props.isPrimary ? '600' : '100')};
  font-size: 1.2rem;
`;
