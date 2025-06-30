import mobx from 'mobx';
import { Container } from '../Common/Container/Container';

window.mobx = mobx;

//container for global game dependencies
export const gameContainer = new Container();

//container for a scene dependencies
export const sceneContainer = new Container(gameContainer);