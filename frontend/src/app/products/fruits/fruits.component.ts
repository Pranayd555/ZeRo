import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit{

  fruits: any[] = [];
  fruitImage: any;
  isEdit: any;
  sharedService = inject(SharedService);

  ngOnInit() {
    this.sharedService.getFruits().subscribe(
      (      data: any) => {
this.fruits = data;
console.log('fruits', this.fruits)
      }
    );
  }

  onFileSelect(event: any) {
    const file: File = event.target.files[0];
    if(file) {
      console.log(file)
      this.fruitImage = file;
    }
  }

  onSubmit(fruit: any) {
    
    this.sharedService.updateFruit(fruit).subscribe({
      next: (data: any) => {
        console.log('upload successfully', data);
      },
      error: (error: any) => {
        console.log('error in upload', error);
      }
    })
  }


  enableEdit(name: string) {
    this.isEdit = Object.assign({...this.isEdit}, {'name': name})
  }
}
