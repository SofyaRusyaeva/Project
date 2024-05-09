import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Makeup } from '../../objects/makeup';
import { ObjectsService } from '../../objects/objects.component';

@Component({
  selector: 'app-makeup',
  templateUrl: './makeup.component.html',
  styleUrl: '../../app.component.css'
  // styleUrl: './makeup.component.css'
})
export class MakeupComponent implements OnInit {
  taskForm!: FormGroup;
  makeupList: Makeup[] = [];
  n: number = 0;
  edit_n: number = -1;

  isHypoallergenicOptions: string[] = ['да', 'нет'];
  constructor(private formBuilder: FormBuilder, private taskService: ObjectsService) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      product: ['', Validators.required],
      amount: ['', Validators.required],
      brand: ['', Validators.required],
      color: ['', Validators.required],
      isHypoallergenic: ['', Validators.required],
      comment: [''],
      price: ['', [Validators.required]]
    });
    this.taskService.getMakeupObjects().subscribe((tasks: Makeup[]) => {
      this.makeupList = tasks;
    });
    this.loadTasks();

  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.edit_n === -1) {
        // console.log("here")
        const newTask: Makeup =
        {
          id:this.n,
          orderDate: new Date(),
          ...this.taskForm.value
        };
        this.taskService.addMakeupObject(newTask);
        this.taskForm.reset();
        this.n += 1
      }
      else {
        // console.log(this.edit_n)
        this.makeupList[this.edit_n].product = this.taskForm.value.product;
        this.makeupList[this.edit_n].amount = this.taskForm.value.amount;
        this.makeupList[this.edit_n].brand = this.taskForm.value.brand;
        this.makeupList[this.edit_n].color = this.taskForm.value.color;
        this.makeupList[this.edit_n].isHypoallergenic = this.taskForm.value.isHypoallergenic;
        this.makeupList[this.edit_n].comment = this.taskForm.value.comment;
        this.makeupList[this.edit_n].price = this.taskForm.value.price;
        this.taskForm.reset();
        this.edit_n = -1;
      }
    }
  }
  loadTasks(): void {
    this.taskService.getMakeupObjects().subscribe(tasks => {
      this.makeupList = tasks;
    });
  }
  deleteTask(id: number): void {
    this.taskService.deleteMakeupObject(id);
  }
  editTask(id: number): void {
    console.log(id)
    const index = this.makeupList.findIndex(task => task.id === id);
    const taskToEdit = this.makeupList[index];
    this.edit_n = index;
    console.log(this.edit_n)
    this.taskForm.patchValue({
      product: taskToEdit.product,
      amount: taskToEdit.amount,
      brand: taskToEdit.brand,
      color: taskToEdit.color,
      isHypoallergenic: taskToEdit.isHypoallergenic,
      comment: taskToEdit.comment,
      price: taskToEdit.price
    });
  }
}
