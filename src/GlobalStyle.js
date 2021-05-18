import { createGlobalStyle } from 'styled-components';
import SoccerBackground from './image/soccer.jpg';
import Soccerhall from './image/soccerhall.jpg';
import Race from './image/race.jpg';

export default createGlobalStyle`

* {
    box-sizing: border-box;
    font-family: sans-serif;
}

body {
    margin: 0 0;
    background-image: url(${Race});
    background-size: cover;
    background-repeat: no-repeat;
    font-family: sans-serif;
    font-size: 1.1rem;
    color: white;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}
`;
