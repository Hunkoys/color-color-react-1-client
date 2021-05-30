import { Component } from 'react';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Title from '../components/Title';

export default class QuitConfirmation extends Component {
  render() {
    const act = (command) => {
      const onCommand = this.props.onCommand;

      return onCommand ? () => onCommand(command) : null;
    };

    return (
      <Card type="QuitConfirmation">
        <Title>Quit</Title>
        <Button action={act('quit')} type="block">
          CONFIRM
        </Button>
        <Spacer type="back-button-space" />
        <Button action={act('cancel')} type="block">
          CANCEL
        </Button>
      </Card>
    );
  }
}
