import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FacilitiesService {

  private URL: string = "http://localhost:3000/facilities";

  constructor(private http:HttpClient) { }
  
  listData() {    
    return this.http.get(this.URL);
  }

  deleteData(id: string) {    
    return this.http.delete(`${this.URL}/${id}`);
  }
}
