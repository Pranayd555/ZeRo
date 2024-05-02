import { Component } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  registerUser: User = new User();
  loadSpinner = false;
  constructor( private loginService: LoginServiceService, private router:Router) {}

  ngOnInit() {
    this.registerUser.isAdmin = "no";
  }
  onSubmit() {
    this.loadSpinner = true;
    this.loginService.register(this.registerUser).subscribe(
      {next : data => {
        this.loadSpinner = false;
        this.router.navigate(['welcome']);
        console.log('user registered', data)
      },
    error : error => {
      this.loadSpinner = false;
      console.log('error while register', error);
    }},
    )
  }
}
