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
<<<<<<< Updated upstream
=======
    console.log('new major change event: ', event);
>>>>>>> Stashed changes
    this.major = event;
  }

  changeLifestyle(event: any) {
    this.lifestyle = event;
  }

  changeState(event: any) {
    this.state = event;
  }

  changeSalary(event: any) {
    this.salary = event;
  }
}

