import { Component } from 'react';
import Splash from './app/Splash';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: Splash,
    };
  }

  render() {
    return <this.state.screen />;
  }
}
