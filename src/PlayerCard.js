import styled from 'styled-components';
import Ball from './image/ball.png';

export default function PlayerCard({
  player,
  onAddToShoppingCart,
  onEditPlayer,
  onDeletePlayer,
}) {
  return (
    <Card>
      <h3>{player.name}</h3>
      <p>{player.price} €</p>
      <p>{player.club}</p>
      <p>{player.position}</p>
      <p>
        {player.skills.map((skill) => (
          <span>{skill} </span>
        ))}
      </p>
      <p>
        <a href={`mailto:${player.email}`}> {player.email} </a>
      </p>
      <Button onClick={() => onAddToShoppingCart(player)}>
        <BallImage src={Ball} alt="Image of a Ball " />
      </Button>
      {/* <button onClick={() => onaddBuyingList(player)}>Get the Player</button> */}
      <button onClick={() => onEditPlayer(player)}>Edit the Player</button>
      <button onClick={() => onDeletePlayer(player)}>Delete the Player</button>
    </Card>
  );
}
const Card = styled.article`
  background: white;
  border-radius: 1rem;
  color: green;
  height: 12rem;
  min-width: calc(100% - 2rem) / 3;
  padding: 1.2rem 1rem;
  position: relative;
  text-shadow: 0;

  h3 {
    margin-top: 0;
  }
  p {
    margin: 0.3rem 0;
    text-shadow: 0;
  }
  a {
    //color: hsl(160, 10%, 20%);
    color: green;
    text-shadow: 0;
  }
`;

const Button = styled.button`
  background-color: transparent;
  left: 75%;
  border: 0;
  position: absolute;
  top: 0;
`;

const BallImage = styled.img`
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  width: 2rem;
`;
