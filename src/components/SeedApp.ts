/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, EventEmitter} from 'angular2/angular2';
import {Foo} from 'app/services/Foo';

@Component({
  selector: 'seed-app',
  appInjector: [Foo]
})
@View({
  template: `
    <h1>hello world</h1>
  `
})
export class SeedApp {
  package: any;
  constructor(private foo: Foo){
     this.package = {jspm: {}};
    
  }
  toggleDrawer(){
    
  }
}
