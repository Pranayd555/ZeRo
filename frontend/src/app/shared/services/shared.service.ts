import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FRUITS_IMG_URL, FRUITS_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }


  getFruits() {
    return this.http.get(FRUITS_URL);
  }

  updateFruit(fruit:any) {
    return this.http.put(FRUITS_IMG_URL, fruit);
  }
}
