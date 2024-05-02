import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Observable, Subject, exhaustMap, fromEvent, interval, switchMap, take, tap } from 'rxjs';
import { Fruit } from 'src/app/shared/models/fruit';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add-fruit',
  templateUrl: './add-fruit.component.html',
  styleUrls: ['./add-fruit.component.css']
})
export class AddFruitComponent implements OnInit{
  @Input() fruits: Fruit[] = [];
  @Input() fruit: Fruit = new Fruit();
  @Input() updatedFruit: Fruit = new Fruit();
  @Input() update: boolean = false;
  @Output() updatedFruitChange: EventEmitter<Fruit> = new EventEmitter<Fruit>()
  @Output() fruitsChange: EventEmitter<Fruit[]> = new EventEmitter<Fruit[]>()
  @Input() isEdit: any = {};
  @Output() isEditChange: EventEmitter<any> = new EventEmitter<any>()
  @Output() updateChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  sharedService = inject(SharedService);

  updateClick$ : Subject<any> = new Subject<any>();
  clickEvent$ = this.updateClick$ as Observable<Event>;

  ngOnInit(): void {
    this.clickEvent$.pipe(tap( ()=> {
      console.log('button clicked!!!')
    }), exhaustMap( ()=> 
      interval(1000).pipe(take(1))
    )).subscribe( () => {
      this.onSubmit(this.updatedFruit);
    })
  }

  onSubmit(fruit: Fruit) {
    if(!this.update) {
    let oldFruit = this.fruits.find( fruit => fruit.name == this.isEdit.name)
    if(JSON.stringify(fruit) !== JSON.stringify(oldFruit)) {
      this.updateFruitAPI(fruit);
    } else {
      this.isEdit = {}
      this.isEditChange.emit({...this.isEdit})
    }
  } else {
    this.addFruitApi(fruit)
  }
  }

  updateFruitAPI(fruit: Fruit) {
    this.updatedFruitChange.emit(this.updatedFruit)
    this.sharedService.updateFruit(fruit).subscribe({
      next: (data: Fruit) => {
        console.log('upload successfully', data);
        this.fruits = this.fruits.map( fruit => {
          if(fruit.name == data.name) {            
            return fruit = {...data};
          }
          return fruit
        })
        this.isEdit = {}
        this.isEditChange.emit({...this.isEdit});
        this.fruitsChange.emit(this.fruits);
      },
      error: (error: any) => {
        console.log('error in upload', error);
      }
    })
  }

  addFruitApi(fruit:Fruit) {
    this.updatedFruitChange.emit(this.updatedFruit)
    this.sharedService.addFruit(fruit).subscribe({
      next: (data: Fruit[]) => {
        console.log('upload successfully', data);
        this.fruits.push(data[0])
        this.update = false;
        this.updateChange.emit(this.update)
        this.isEdit = {}
        this.fruitsChange.emit(this.fruits);
        this.isEditChange.emit({...this.isEdit})
      },
      error: (error: any) => {
        console.log('error in upload', error);
      }
    })
  }
  

 
}
