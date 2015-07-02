export class Foo {
  constructor(){
    console.log('bar!')
  }
  sayHello(name:string = 'dave'){
    console.log(`hello, {name}`);
  }
}