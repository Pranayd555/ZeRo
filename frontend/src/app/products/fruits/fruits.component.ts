import { Component, OnInit, inject } from '@angular/core';
import { Fruit } from 'src/app/shared/models/fruit';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit{

  fruits: Fruit[] = [];
  colorCodes = ['orange', 'red', 'green', 'blue'];
  currencyConvertRate = [{"usd/inr": 0.012, "inr/usd": 83.45}]
  updatedFruit: Fruit = new Fruit();
  isEdit: any;
  sharedService = inject(SharedService);
  addNew = false;

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

  getAllFruits() {
    this.sharedService.getFruits().subscribe(
      {
       next: (data: Fruit[]) => {
           this.fruits = data;
           console.log('fruits', this.fruits)
       },
       error: (error) => {
         console.log('error occurred while fetching the data', error)
       }
     }
     );
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
    this.updatedFruit = new Fruit()
  }

  deleteFruit(name: string) {
    this.sharedService.deleteFruit(name).subscribe({
      next: () => {
        this.getAllFruits();
      }
    });
  } 
  
}
