import goto from './goto';
import Screen from './Screen';
import Card from './screen/Card';
import Button from './screen/Button';
import Splash from './Splash';

export default class CreateBoard extends Screen {
  render() {
    return (
      <Card>
        <h1>Size</h1>
        <Button>7 x 7</Button>
        <Button>11 x 11</Button>
        <Button>15 x 15</Button>
        <Button action={() => goto(Splash)}>Home</Button>
      </Card>
    );
  }
}
