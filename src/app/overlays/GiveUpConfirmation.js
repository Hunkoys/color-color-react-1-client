import { Component } from 'react';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Title from '../components/Title';

export default class GiveUpConfirmation extends Component {
  render() {
    return (
      <Card type="GiveUpConfirmation">
        <Title>Rematch</Title>
        <Button
          action={() => {
            this.props.onCommand('confirm');
          }}
          type="block"
        >
          CONFIRM
        </Button>
        <Spacer type="back-button-space" />
        <Button
          action={() => {
            this.props.onCommand('cancel');
          }}
          type="block"
        >
          CANCEL
        </Button>
      </Card>
    );
  }
}
