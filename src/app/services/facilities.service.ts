import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class FacilitiesService {

  private URL: string = "http://localhost:3000";

  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private router: Router
  ) { }
  
  listData():Observable<any>{
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return this.http.get(`${this.URL}/error`);
    }
    return this.http.get(`${this.URL}/facilities`);
  }

  deleteData(id: string):Observable<any>{
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return this.http.get(`${this.URL}/error`);
    }
    return this.http.delete(
      `${this.URL}/facilities/${id}`);
  }

  updateData(data:any):Observable<any>{
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return this.http.get(`${this.URL}/error`);
    }
    const ID = data.id;
    return this.http.put(
      `${this.URL}/facilities/${ID}`, 
      data
      );
  }

  addData(data:any):Observable<any>{
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return this.http.get(`${this.URL}/error`);
    }
    return this.http.post(
      `${this.URL}/facilities`,
      data
      );
  }
}
