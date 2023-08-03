import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'project2';
  state: string = '';
  lifestyle: string = '';
  major: string = '';
  salary: number = 0;

  changeMajor(event: any) {
    console.log('new major change event: ', event);
    this.state = event;
  }

  changeLifestyle(event: any) {
    console.log('new lifestyle change event: ', event);
    this.lifestyle = event;
  }

  changeState(event: any) {
    console.log('new state change event: ', event);
    this.state = event;
  }

  changeSalary(event: any) {
    console.log('new salary change event: ', event);
    this.salary = event;
  }

  

  // addSalary(newSalary: number) {
  //   this.items.push(newSalary);
  // }
}

