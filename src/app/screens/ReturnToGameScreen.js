import { Component } from 'react';
import Button from '../../generic-components/Button';
import Card from '../components/Card';
import Screen from '../components/Screen';
import Title from '../components/Title';

export default class ReturnToGameScreen extends Component {
  render() {
    return (
      <Screen name="ReturnToGameScreen">
        <Card>
          <Title>You're already in game</Title>
          <Button>Return To Game</Button>
          <Button>Leave Game</Button>
        </Card>
      </Screen>
    );
  }
}
