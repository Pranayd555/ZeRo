import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, exhaustMap, fromEvent, interval, of, switchMap, take, tap } from 'rxjs';
import { Fruit } from 'src/app/shared/models/fruit';
import { SharedService } from 'src/app/shared/services/shared.service';
import { addFruits, updateFruits } from 'src/app/store/actions/fruits.action';
import { FruitState } from 'src/app/store/reducers/fruit.reducer';

@Component({
  selector: 'app-add-fruit',
  templateUrl: './add-fruit.component.html',
  styleUrls: ['./add-fruit.component.css']
})
export class AddFruitComponent implements OnInit{
  @Input() fruits: Fruit[] = [];
  @Input() fruit: Fruit = new Fruit();
  @Input() updatedFruit: Fruit = new Fruit();
  @Input() addNew: boolean = false;
  @Output() updatedFruitChange: EventEmitter<Fruit> = new EventEmitter<Fruit>()
  @Output() fruitsChange: EventEmitter<Fruit[]> = new EventEmitter<Fruit[]>()
  @Input() isEdit: any = {};
  @Output() isEditChange: EventEmitter<any> = new EventEmitter<any>()
  @Output() addNewChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  sharedService = inject(SharedService);
  isLoading: number = NaN;

  updateClick$ : Subject<any> = new Subject<any>();
  clickEvent$ = this.updateClick$ as Observable<Event>;

  storeFruits$ = this.store.select('fruits')
  constructor(private store: Store<FruitState>) {}

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
    if(!this.addNew) {
    let oldFruit = this.fruits.find( fruit => fruit.name == this.isEdit.name)
    if(JSON.stringify(fruit) !== JSON.stringify(oldFruit)) {
      this.isLoading = 0;
      this.updateFruitAPI(fruit);
    } else {
      this.isEdit = {}
      this.isEditChange.emit({...this.isEdit})
    }
  } else {
    this.isLoading = 0;
    this.addFruitApi(fruit)
  }
  }

  updateFruitAPI(fruit: Fruit) {
    let fruit$ = of(fruit);
    fruit$.pipe(
      exhaustMap( ()=> {
        return interval(1000).pipe(take(1))
      })
    ).subscribe( 
      ()=> {
        this.store.dispatch(updateFruits(fruit));
      }
    )
  }

  addFruitApi(fruit:Fruit) {
    let fruit$ = of(fruit);
    fruit$.pipe(
      exhaustMap( ()=> {
        return interval(1000).pipe(take(1))
      })
    ).subscribe( 
      ()=> {
        this.store.dispatch(addFruits(fruit));
      }
    )
  }
  
  cancelUpdate() {
    this.isEditChange.emit({});
    this.addNewChange.emit(false);
  }

 
}
