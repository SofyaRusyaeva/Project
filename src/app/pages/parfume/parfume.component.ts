import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parfume } from '../../objects/parfume';
import { ObjectsService } from '../../objects/objects.component';

@Component({
  selector: 'app-parfume',
  templateUrl: './parfume.component.html',
  styleUrl: '../../app.component.css'
  // styleUrl: './parfume.component.css'

})
export class ParfumeComponent {
  taskForm!: FormGroup;
  parfumeList: Parfume[] = [];
  n: number = 0;
  edit_n: number = -1;

  sexOptions: string[] = ['женский', 'мужской', 'унисекс'];
  constructor(private formBuilder: FormBuilder, private taskService: ObjectsService) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      product: ['', Validators.required],
      volume: ['', Validators.required],
      brand: ['', Validators.required],
      notes: ['', Validators.required],
      sex: ['', Validators.required],
      comment: [''],
      price: ['', [Validators.required]]
    });
    this.taskService.getParfumeObjects().subscribe((tasks: Parfume[]) => {
      this.parfumeList = tasks;
    });
    this.loadTasks();

  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.edit_n == -1) {
        const newTask: Parfume =
        {
          id:this.n,
          orderDate: new Date(),
          ...this.taskForm.value
        };
        this.taskService.addParfumeObject(newTask);
        this.taskForm.reset();
        this.n += 1
      }
      else {
        this.parfumeList[this.edit_n].product = this.taskForm.value.product;
        this.parfumeList[this.edit_n].volume = this.taskForm.value.volume;
        this.parfumeList[this.edit_n].brand = this.taskForm.value.brand;
        this.parfumeList[this.edit_n].notes = this.taskForm.value.notes;
        this.parfumeList[this.edit_n].sex = this.taskForm.value.sex;
        this.parfumeList[this.edit_n].comment = this.taskForm.value.comment;
        this.parfumeList[this.edit_n].price = this.taskForm.value.price;
        this.taskForm.reset();
        this.edit_n = -1;
      }
    }
  }
  loadTasks(): void {
    this.taskService.getParfumeObjects().subscribe(tasks => {
      this.parfumeList = tasks;
    });
  }
  deleteTask(id: number): void {
    this.taskService.deleteParfumeObject(id);
  }
  editTask(id: number): void {
    const index = this.parfumeList.findIndex(task => task.id === id);
    const taskToEdit = this.parfumeList[index];
    this.edit_n = index;
    this.taskForm.patchValue({
      product: taskToEdit.product,
      volume: taskToEdit.volume,
      brand: taskToEdit.brand,
      notes: taskToEdit.notes,
      sex: taskToEdit.sex,
      comment: taskToEdit.comment,
      price: taskToEdit.price
    });
  }
}