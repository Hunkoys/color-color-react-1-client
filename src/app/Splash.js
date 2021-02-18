import Screen from './Screen';
import Card from './screen/Card';
import TextBox from './screen/TextBox';
import Button from './screen/Button';

export default class Splash extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      username: [''], // Cookie name
    };
  }

  render() {
    console.log(this.state.username);
    return (
      <Card>
        <h1>Color Color</h1>
        <TextBox store={this.state.username} placeholder="USERNAME" />
        <Button>CREATE</Button>
        <Button>JOIN</Button>
      </Card>
    );
  }
}
