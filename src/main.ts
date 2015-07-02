/// <reference path="../typings/angular2/angular2.d.ts" />

//babel polyfill 
import 'babel/polyfill';

import {bootstrap} from 'angular2/angular2';
import {SeedApp} from 'app/components/SeedApp';

export function run(){
    
    console.log('bootstrapping...');
    return bootstrap(SeedApp,[]);



}

console.timeEnd('ready');
console.time('bootstrap');

run().then(() => {
    console.timeEnd('bootstrap');
    console.timeEnd('all');
});