import { Component, Fragment } from 'react';
import { faces } from '../../common/classes';
import Box from '../../generic-components/Box';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Text from '../components/Text';
import Title from '../components/Title';

export const keywords = {
  playAgain: 'play-again',
  home: 'home',
  enemyLeft: 'enemy-left',
  waiting: 'waiting',
};

export default class GameOver extends Component {
  render() {
    const act = (command) => {
      const onCommand = this.props.onCommand;

      return onCommand ? () => onCommand(command) : null;
    };

    const waiting = this.props.status === keywords.waiting;
    const buttonText = waiting ? 'REQUESTED' : 'PLAY AGAIN';
    const enemyLeft = this.props.status === keywords.enemyLeft;

    console.log('wait ', waiting);
    console.log('!el', !enemyLeft);
    return (
      <Card type="GameOver">
        {this.props.children}
        {!enemyLeft ? (
          <Fragment>
            <Spacer type="h-gutter" />
            <Button disabled={waiting} action={act(keywords.playAgain)} type="block">
              {buttonText}
            </Button>
          </Fragment>
        ) : (
          <Box type="padded">
            <Text>
              {faces[this.props.enemy.faceName]} <span className="highlight-text">{this.props.enemy.username}</span>{' '}
              left the game
            </Text>
          </Box>
        )}
        <Spacer type="h-gutter" />
        <Button action={act(keywords.home)} type="block">
          HOME
        </Button>
      </Card>
    );
  }
}
