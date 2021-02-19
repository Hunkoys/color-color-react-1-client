import Screen from './Screen';
import Card from './screen/Card';
import Button from './screen/Button';
import Splash from './Splash';
import AppContext from '../AppContext';
import { Fragment } from 'react';

export default class CreateBoard extends Screen {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => (
          <Fragment>
            <Card>
              <h1>Size</h1>
              <Button>7 x 7</Button>
              <Button>11 x 11</Button>
              <Button>15 x 15</Button>
              <Button action={() => app.goto(Splash)}>Home</Button>
            </Card>
          </Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}
