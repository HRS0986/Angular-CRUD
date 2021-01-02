import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class FacilitiesService {

  private URL: string = "http://192.168.1.61:3000/facilities";

  constructor(private http:HttpClient) { }
  
  listData() {
    return this.http.get(this.URL);
  }

  deleteData(id: string) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  updateData(data:any) {
    const ID = data.id;
    return this.http.put(`${this.URL}/${ID}`, data);
  }

  addData(data:any) {
    return this.http.post(`${this.URL}`, data);
  }
}
