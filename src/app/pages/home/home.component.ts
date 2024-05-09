import { Component, OnInit } from '@angular/core';
import { Care } from '../../objects/care';
import { ObjectsService } from '../../objects/objects.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Makeup } from '../../objects/makeup';
import { Parfume } from '../../objects/parfume';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: '../../app.component.css'
  // styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'home';
  taskForm!: FormGroup;

  name = "";
  cellNumber = "";
  careList!: Care[];
  makeupList!: Makeup[];
  parfumeList!: Parfume[];

  sum = 0;
  constructor(private taskService: ObjectsService) { }

  loadTasks(): void {
    this.taskService.getCareObjects().subscribe(tasks => {
      this.careList = tasks;
    });
    this.taskService.getMakeupObjects().subscribe(tasks => {
      this.makeupList = tasks;
    });
    this.taskService.getParfumeObjects().subscribe(tasks => {
      this.parfumeList = tasks;
    });
    this.sum = [
      ...this.careList.map(item => item.price * item.amount),
      ...this.makeupList.map(item => item.price * item.amount),
      ...this.parfumeList.map(item => item.price)
    ].reduce((acc, curr) => acc + curr, 0);
  }
  delete(id: number, type: number): void {
    if (type == 0) {
      const index = this.careList.findIndex(task => task.id === id);
      this.sum -= this.careList[index].price * this.careList[index].amount;
      this.taskService.deleteCareObject(id);
    }
    else if (type == 1) {
      const index = this.makeupList.findIndex(task => task.id === id);
      this.sum -= this.makeupList[index].price * this.makeupList[index].amount;
      this.taskService.deleteMakeupObject(id);
    }
    else {
      const index = this.parfumeList.findIndex(task => task.id === id);
      this.sum -= this.parfumeList[index].price;
      this.taskService.deleteParfumeObject(id)
    }
  }
  ngOnInit(): void {
    this.loadTasks();
  }

  logIn(): void {
    alert(this.name + ", Вы вошли на сайт!");
    this.ngOnInit();
    console.log('User ' + this.name + ' ' + this.cellNumber + ' logged in');
  }
}