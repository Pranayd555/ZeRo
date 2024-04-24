import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
import { LoginUser } from '../../shared/models/loginUser';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  demoData: User[] = []

  loginUser: LoginUser = new LoginUser();

  constructor( private loginService : LoginServiceService, private router: Router) {}
  ngOnInit(): void {
    this.loginService.getAllUsers().subscribe({
      next: data => {
        console.log('data', data);
        this.demoData = data;
        let user = {
          userName : this.demoData[0].userName,
          password : this.demoData[0].password,
          email : this.demoData[0].email
        }
        // this.loginService.loginUser(user).subscribe(
        //   data => {
        //     console.log('logged in user', data)
        //   }
        // )
      },
      error: error => {
        console.log('error occurred', error)
      }
    })
  }

  onSubmit() {
    this.loginService.loginUser(this.loginUser).subscribe(
          data => {
            console.log('logged in user', data)
            this.router.navigate(['welcome']);
          }
        )
  }
}
