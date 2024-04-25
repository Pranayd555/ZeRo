import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FRUITS_IMG_URL, FRUITS_URL } from '../constants/urls';
import { Fruit } from '../models/fruit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }


  getFruits(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(FRUITS_URL);
  }

  updateFruit(fruit:any): Observable<Fruit> {
    return this.http.put<Fruit>(FRUITS_IMG_URL, fruit);
  }
}
