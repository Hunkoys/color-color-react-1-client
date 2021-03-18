import { Component } from 'react';
import AppContext from '../../AppContext';
import Card from '../components/Card';
import Screen from '../components/Screen';

export default class LoadingScreen extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => {
          return (
            <Screen name="Loading">
              <Card>Loading...</Card>
            </Screen>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
