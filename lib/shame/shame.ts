import {Component} from "angular2/angular2"
import { User } from '../user/user';

let template = `
  <div class="container">
    <img class="user" src="http://placebear.com/g/400/200.jpg">
    <div class="overlay"></div>
    <img class="shame" src="assets/shame.png">
  </div>
`;

let styles = require('!raw!autoprefixer?browsers=last 2 versions!sass!./shame.scss');

@Component({
  selector: "shame",
  directives: [ User ],
  styles: [ styles ],
  template
})
export class Shame {
    constructor(public user: User) {
      
    }
}
