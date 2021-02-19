import { Component } from 'react';
import Card from './screen/Card';
import TextBox from './screen/TextBox';
import Button from './screen/Button';
import CreateBoard from './CreateBoard';

import AppContext from '../AppContext';
export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppContext.Consumer>
        {(app) => {
          console.log(app);
          return (
            <Card>
              <h1>Color Color</h1>
              <TextBox store={app.state.username} placeholder="USERNAME" />
              <Button action={() => app.goto(CreateBoard)}>CREATE</Button>
              <Button>JOIN</Button>
            </Card>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
