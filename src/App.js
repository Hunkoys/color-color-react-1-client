import { Component, createContext } from 'react';
import { setGoto } from './app/goto';
import Splash from './app/Splash';
import AppContext from './AppContext';

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
    return (
      <AppContext.Provider value={['Boy']}>
        <this.state.screen App={this.appInterface} />
        <Splash />
      </AppContext.Provider>
    );
  }
}
