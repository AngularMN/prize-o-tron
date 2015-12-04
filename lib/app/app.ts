import {Component, View} from 'angular2/angular2';
import {Navbar} from '../navbar/navbar';
import {Home} from '../home/home';
import {About} from '../about/about';
import {HttpPage} from '../http/index';
import {DataType} from '../dataType/dataType';
import {RouterOutlet, RouteConfig, Route} from 'angular2/router';

@Component({
    selector: "app"
})
@View({
    directives: [Navbar, RouterOutlet],
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./app.scss')],
    template: require('./app.html')
})
@RouteConfig([
    new Route({ path: '/', component: Home, name: 'Home' }),
    new Route({ path: '/about', component: About, name: 'About', data: {pageId: null}}),
    new Route({ path: '/http', component: HttpPage, name: 'Http' }),
    new Route({ path: '/datatype', component: DataType, name: 'DataType' })
])
export class App {

    constructor() {

    }

    onInit() {
        console.log('[Component] app running');
    }
}
