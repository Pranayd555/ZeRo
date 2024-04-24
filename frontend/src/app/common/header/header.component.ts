import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/register/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router, private loginService: LoginServiceService) {}

  loginUser: any;
  ngOnInit(): void {
    this.loginService.userObservable$.subscribe(
      data => {
        this.loginUser = data;
      }
    )
  }
  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  logOutUser() {
    this.loginService.logout();
  }
}
