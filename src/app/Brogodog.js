import { Component, Fragment } from 'react';
import AppContext from '../AppContext';
import Button from './screen/Button';
import TextBox from './screen/TextBox';
import SplashContext from './SplashContext';

export default class Brogodog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ['nick'],
    };
  }

  render() {
    return (
      <SplashContext.Consumer>
        {({ splash, app }) => (
          <Fragment>
            <TextBox store={splash} />
            <TextBox store={app} />

            <Button action={() => console.log(splash[0])}>Log Local</Button>
            <Button action={() => console.log(app[0])}>Log Global</Button>
          </Fragment>
        )}
      </SplashContext.Consumer>
    );
  }
}
