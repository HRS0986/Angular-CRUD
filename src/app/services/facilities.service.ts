import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";
import { Router } from '@angular/router';
import { TokenStorageService } from "./token-storage.service";


@Injectable({
  providedIn: 'root'
})

export class FacilitiesService {

  private URL: string = "http://localhost:3000";

  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    ) { }

  TOKEN = this.tokenStorage.getToken();

  httpOptions = {
    headers: new HttpHeaders({ "Authorization": `Bearer ${this.TOKEN}` })
  };
  
  listData():Observable<any>{
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return this.http.get(`${this.URL}/error`);
    }
    return this.http.get(
      `${this.URL}/660/facilities`,
      this.httpOptions
      );
  }

  deleteData(id: string):Observable<any>{
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return this.http.get(`${this.URL}/error`);
    }
    return this.http.delete(
      `${this.URL}/660/facilities/${id}`,
      this.httpOptions
      );
  }

  updateData(data:any):Observable<any>{
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return this.http.get(`${this.URL}/error`);
    }
    const ID = data.id;
    return this.http.put(
      `${this.URL}/660/facilities/${ID}`, 
      data,
      this.httpOptions
      );
  }

  addData(data:any):Observable<any>{
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return this.http.get(`${this.URL}/error`);
    }
    return this.http.post(
      `${this.URL}/660/facilities`,
      data,
      this.httpOptions
      );
  }
}
