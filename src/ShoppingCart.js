import styled from 'styled-components';
/* import Ball from './image/ball.png'; */

export default function ShoppingCart({ playerItems }) {
  return (
    <Card>
      {playerItems.map((player) => (
        <p>{player.name}</p>
      ))}
      <p></p>
      <p></p>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
`;
