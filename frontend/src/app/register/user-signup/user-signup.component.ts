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

  constructor( private loginService: LoginServiceService, private router:Router) {}

  ngOnInit() {
    this.registerUser.isAdmin = "no";
  }
  onSubmit() {
    this.loginService.register(this.registerUser).subscribe(
      data => {
        this.router.navigate(['welcome']);
        console.log('user registered', data)
      },
    )
  }
}
