import styled from 'styled-components';
export default function PlayerCard({ player }) {
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
    </Card>
  );
}
const Card = styled.article`
  background: white;
  color: green;
  height: 12rem;
  min-width: calc(100% - 2rem) / 3;
  padding: 1.2rem 1rem;
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
