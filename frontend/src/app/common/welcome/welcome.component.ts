import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{


  
  router = inject(Router)
  fruits = [];

  ngOnInit(): void {
    
  }

  navigateTo(url:string) {
    this.router.navigate([url])
  }


}
