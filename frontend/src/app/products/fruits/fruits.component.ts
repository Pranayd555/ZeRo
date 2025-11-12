import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { concatMap, exhaustMap, interval, of, switchMap, take } from 'rxjs';
import { Fruit } from 'src/app/shared/models/fruit';
import { SharedService } from 'src/app/shared/services/shared.service';
import { deleteFruits, getFruits } from 'src/app/store/actions/fruits.action';
import { FruitState } from 'src/app/store/reducers/fruit.reducer';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit, AfterViewInit{

  @ViewChild('addFruit')
  addFruit!: ElementRef;

  @ViewChildren('progressBar') progressBar!: QueryList<ElementRef>;
  defaultDiameter = 20;

  fruits: Fruit[] = [];
  colorCodes = ['#1D1CE5', '#C47AFF', '#FF0B55', '#06D001'];
  currencyConvertRate = [{"usd/inr": 0.012, "inr/usd": 83.45}]
  updatedFruit: Fruit = new Fruit();
  isEdit: any;
  sharedService = inject(SharedService);
  private store = inject(Store<FruitState>);
  addNew = false;
  storeFruits$ = this.store.select('fruits');
  isDelete: number = NaN;

  highlightColor = {
    name: true,
    price: true,
    discount: true,
    about: true
  }

  highlightColorClass = {
    name: this.colorCodes[0],
    price: this.colorCodes[1],
    discount: this.colorCodes[2],
    about: this.colorCodes[3]
  }


  ngOnInit() {
    this.getAllFruits();
  }

  ngAfterViewInit(): void {
    this.progressBar.changes.subscribe( (el)=> {
      console.log(el);
    })
    console.log(this.addFruit)
  }

  getAllFruits() {
    this.store.dispatch(getFruits());
      this.storeFruits$.subscribe( data => {        
      this.fruits = [];
          for(let key in data) {
            key !== 'type' ? this.fruits.push(data[key]) : ''
          }
          this.addNew = false;
          this.isEdit = {};
          console.log('data from store', this.fruits)
        })
  }


  enableEdit(name: string) {
    this.addNew ? this.addNew = false : ''
    this.isEdit = Object.assign({...this.isEdit}, {'name': name})
    this.updatedFruit = {...this.fruits.find( fruit => fruit.name == name)!};
  }

  isUpdated(index: any, value: Fruit) {
    return value;
  }

  resetEdit() {
    this.isEdit = {}
  }

  addNewFruit() {
    this.addNew = true;
    this.isEdit = {};
    this.updatedFruit = new Fruit();
    console.log(this.addFruit);
    const t = setTimeout( () => {
      clearTimeout(t);
      this.addFruit.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 500);
  }

  deleteFruit(name: string, index: number) {
    // this.store.dispatch(deleteFruits({name: name}));
    this.isDelete = index;
    let name$ = of(name);
    name$.pipe(switchMap(()=> {
     return interval(2000).pipe(take(1))
    } )).subscribe(
      data=> {
        this.store.dispatch(deleteFruits({name: name}));
      }
    )
  } 
  
}
