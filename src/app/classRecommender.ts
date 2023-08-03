import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <h1>Parent Component</h1>
    <app-preferences
      (majorChange)="handleMajorChange($event)"
      (lifestyleChange)="handleLifestyleChange($event)"
      (stateChange)="handleStateChange($event)"
      (salaryChange)="handleSalaryChange($event)"
    ></app-preferences>
  `,
})
export class ParentComponent {
  handleMajorChange(event: any) {
    console.log('new major change event: ', event);
  }

  handleLifestyleChange(event: any) {
    console.log('new lifestyle change event: ', event);
  }

  handleStateChange(event: any) {
    console.log('new state change event: ', event);
  }

  handleSalaryChange(event: any) {
    console.log('new salary change event: ', event);
  }
}