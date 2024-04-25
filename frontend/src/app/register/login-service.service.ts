import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { LOGIN_URL, REGISTER_URL, USERS_URL } from '../shared/constants/urls';
import { LoginUser } from '../shared/models/loginUser';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';


const LOGIN_USER = 'login';
const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable$ : Observable<User>
  constructor(private http: HttpClient, 
    private toastrService: ToastrService) { 
    this.userObservable$ = this.userSubject.asObservable();
  }

  loginUser(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to My Project ${user.name}!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error)
        }
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(LOGIN_USER);
    window.location.reload();
  }

  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(REGISTER_URL, userRegister).pipe(
      tap({
        next: (user)=> {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to my project ${user.name}`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_URL)
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(LOGIN_USER, JSON.stringify(user))
  }

  private getUserFromLocalStorage(): User {
    if(typeof localStorage !== 'undefined'){
      const userJson = localStorage.getItem(LOGIN_USER);
    if(userJson) {
      return JSON.parse(userJson) as User;
    }
  }
    return new User()
}

getUserToken() {
  return this.getUserFromLocalStorage().token;
}
}