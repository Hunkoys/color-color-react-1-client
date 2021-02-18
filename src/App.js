import { Component } from 'react';
import { setGoto } from './app/goto';
import Splash from './app/Splash';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: Splash,
    };
    setGoto(this.appInterface.goto);
  }

  appInterface = {
    goto: (screen) => {
      this.setState(() => ({
        screen,
      }));
    },
  };

  render() {
    return <this.state.screen App={this.appInterface} />;
  }
}
