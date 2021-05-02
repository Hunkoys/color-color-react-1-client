import { Component } from 'react';
import AppContext from '../../AppContext';
import { faces } from '../../common/classes';
import { appendClassName } from '../../common/functions';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import GridSelector from '../components/GridSelector';
import Screen from '../components/Screen';
import Title from '../components/Title';
import GameScreen from './GameScreen';

export default class Menu extends Component {
  render() {
    const act = (command) => {
      const onCommand = this.props.onCommand;

      return onCommand ? () => onCommand(command) : null;
    };

    return (
      <Card type="Menu">
        <Title>Menu</Title>
        <Button type="block" action={act('quit')}>
          QUIT
        </Button>
        <Spacer type="back-button-space" />
        <Button type="block" action={act('back')}>
          BACK
        </Button>
      </Card>
    );
  }
}
