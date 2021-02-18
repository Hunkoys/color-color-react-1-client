import Screen from './Screen';
import Card from './screen/Card';
import TextBox from './screen/TextBox';
import Button from './screen/Button';
import CreateBoard from './CreateBoard';
import goto from './goto';

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
        <Button action={() => goto(CreateBoard)}>CREATE</Button>
        <Button action={}>JOIN</Button>
      </Card>
    );
  }
}
