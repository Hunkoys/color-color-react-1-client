import { Component, createContext } from 'react';
import Splash from './app/Splash';
import AppContext from './AppContext';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: Splash,
      username: [''],
    };

    this.appInterface = {
      state: this.state,
      goto: (screen) => {
        this.setState(() => ({
          screen,
        }));
      },
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.appInterface}>
        <this.state.screen />
      </AppContext.Provider>
    );
  }
}
