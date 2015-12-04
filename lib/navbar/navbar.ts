import {Component, View} from 'angular2/angular2';
import { RouterLink} from 'angular2/router';
import { User } from '../user/user';

@Component({
  selector: "navbar",
  directives: [RouterLink, User],
  styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./navbar.scss')],
  template: require('./navbar.html')
})
export class Navbar {
    title: string;

    constructor() {
        this.title = window.noBullshitBoilerplate.name;
    }

    onInit() {
        console.log('[Component] navbar running');
    }
}
