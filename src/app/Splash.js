import Screen from './Screen';
import Card from './screen/Card';
import TextBox from './screen/TextBox';
import Button from './screen/Button';
import CreateBoard from './CreateBoard';
import goto from './goto';
import AppContext from '../AppContext';
import SplashContext from './SplashContext';
import Brogodog from './Brogodog';
export default class Splash extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      username: [''], // Cookie name
    };
  }

  render() {
    return (
      <AppContext.Consumer>
        {(app) => (
          <SplashContext.Provider value={{ splash: this.state.username, app }}>
            <Card>
              <h1>Color Color</h1>
              <TextBox store={this.state.username} placeholder="USERNAME" />
              <Button action={() => goto(CreateBoard)}>CREATE</Button>
              <Button>JOIN</Button>
              <Brogodog />
            </Card>
          </SplashContext.Provider>
        )}
      </AppContext.Consumer>
    );
  }
}
