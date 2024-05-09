import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Care } from './care';
import { Makeup } from './makeup';
import { Parfume } from './parfume';

@Injectable({
  providedIn: 'root'
})

export class ObjectsService 
{
   care: Care[] = [];
   careObjects: BehaviorSubject<Care[]> = new BehaviorSubject<Care[]>([]);
  
   makeup: Makeup[] = [];
   makeupObjects: BehaviorSubject<Makeup[]> = new BehaviorSubject<Makeup[]>([]);
  
   parfume: Parfume[] = [];
   parfumeObjects: BehaviorSubject<Parfume[]> = new BehaviorSubject<Parfume[]>([]);

  constructor() { }

  addCareObject(obj: Care): void 
  {
    this.care.push(obj);
    this.careObjects.next(this.care);
  }
  getCareObjects(): Observable<Care[]> 
  {
    return this.careObjects.asObservable();
  }
  // deleteCareObject(id: number): Observable<void> {
  //   this.care = this.care.filter(task => task.id !== id);
  //   return of();
  // }
  deleteCareObject(id: number): void {
    const index = this.care.findIndex(task => task.id === id);
    if (index !== -1) {
      this.care.splice(index, 1);
    }
  }
  addMakeupObject(obj: Makeup): void 
  {
    this.makeup.push(obj);
    this.makeupObjects.next(this.makeup);
  }
  getMakeupObjects(): Observable<Makeup[]> 
  {
    return this.makeupObjects.asObservable();
  }
  deleteMakeupObject(id: number): void {
    const index = this.makeup.findIndex(task => task.id === id);
    if (index !== -1) {
      this.makeup.splice(index, 1);
    }
  }

  addParfumeObject(obj: Parfume): void 
  {
    this.parfume.push(obj);
    this.parfumeObjects.next(this.parfume);
  }
  getParfumeObjects(): Observable<Parfume[]> 
  {
    return this.parfumeObjects.asObservable();
  }
  deleteParfumeObject(id: number): void {
    const index = this.parfume.findIndex(task => task.id === id);
    if (index !== -1) {
      this.parfume.splice(index, 1);
    }
  }
}