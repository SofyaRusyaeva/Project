import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Care } from '../../objects/care';
import { ObjectsService } from '../../objects/objects.component';

@Component({
  selector: 'app-care',
  templateUrl: './care.component.html',
  styleUrl: '../../app.component.css'
  // styleUrl: './care.component.css'
})

export class CareComponent implements OnInit {
  taskForm!: FormGroup;
  careList: Care[] = [];
  n: number = 0;
  edit_n: number = -1;
  skinTypeOptions: string[] = ['сухая', 'нормальная', 'жирная',
    'комбинированная', 'чувствительная', 'для всех']; // Добавляем свойство isHypoallergenicOptions
  sexOptions: string[] = ['женский', 'мужской', 'унисекс'];
  constructor(private formBuilder: FormBuilder, private taskService: ObjectsService) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      product: ['', Validators.required],
      area: ['', Validators.required],
      sex: ['', Validators.required],
      amount: ['', Validators.required],
      brand: ['', Validators.required],
      skinType: ['', [Validators.required]],
      price: ['', [Validators.required]],
      comment: [''],
    });
    this.taskService.getCareObjects().subscribe((tasks: Care[]) => {
      this.careList = tasks;
    });
    this.loadTasks();
  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.edit_n === -1) {
        const newTask: Care =
        {
          id: this.n,
          orderDate: new Date(),
          ...this.taskForm.value
        };
        this.taskService.addCareObject(newTask);
        this.taskForm.reset();
        this.n += 1
      }
      else {
        this.careList[this.edit_n].product = this.taskForm.value.product;
        this.careList[this.edit_n].area = this.taskForm.value.area;
        this.careList[this.edit_n].sex = this.taskForm.value.sex;
        this.careList[this.edit_n].amount = this.taskForm.value.amount;
        this.careList[this.edit_n].brand = this.taskForm.value.brand;
        this.careList[this.edit_n].skinType = this.taskForm.value.skinType;
        this.careList[this.edit_n].comment = this.taskForm.value.comment;
        this.careList[this.edit_n].price = this.taskForm.value.price;
        this.taskForm.reset();
        this.edit_n = -1;
      }
    }
  }
  loadTasks(): void {
    this.taskService.getCareObjects().subscribe(tasks => {
      this.careList = tasks;
    });
  }
  deleteTask(id: number): void {
    this.taskService.deleteCareObject(id);
  }
  editTask(id: number): void {
    const index = this.careList.findIndex(task => task.id === id);
    const taskToEdit = this.careList[index];
    this.edit_n = index;
    this.taskForm.patchValue({
      product: taskToEdit.product,
      area: taskToEdit.area,
      sex: taskToEdit.sex,
      amount: taskToEdit.amount,
      brand: taskToEdit.brand,
      skinType: taskToEdit.skinType,
      comment: taskToEdit.comment,
      price: taskToEdit.price
    });
  }
}