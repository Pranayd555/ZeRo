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
  updatedFruit: Fruit = new Fruit();
  isEdit: any;
  sharedService = inject(SharedService);

  ngOnInit() {
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

  onSubmit(fruit: Fruit) {
    
    this.sharedService.updateFruit(fruit).subscribe({
      next: (data: Fruit) => {
        console.log('upload successfully', data);
        this.fruits.map( fruit => {
          if(fruit.name == data.name) {
            fruit = data;
            this.isEdit = Object.assign({...this.isEdit}, {})
          }
        })
      },
      error: (error: any) => {
        console.log('error in upload', error);
      }
    })
  }


  enableEdit(name: string) {
    if(this.isEdit?.name && name !== this.isEdit?.name ) {
      let oldFruit = this.fruits.find( fruit => fruit.name == this.isEdit.name)!;
      JSON.stringify(oldFruit) !== JSON.stringify(this.updatedFruit) ? this.onSubmit(oldFruit) : '';
    }
    this.updatedFruit = this.fruits.find( fruit => fruit.name == this.isEdit.name)!;
    this.isEdit = Object.assign({...this.isEdit}, {'name': name})
  }

  isUpdated(index: any, value: Fruit) {
    return value;
  }
}
