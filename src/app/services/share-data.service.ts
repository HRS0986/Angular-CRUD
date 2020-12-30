import { Injectable } from '@angular/core';
import { Facility } from '../types';

@Injectable({
  providedIn: 'root'
})

export class ShareDataService {

  private deleteId: string = '';
  private recordDeleted: boolean = false;
  private recordAdded: boolean = false;
  private selectedFacility: Facility = {
    facilityName: '',
    shortCode:'',
    idDs:0,
    activity:"Yes",
    id:0,
  };
  
  constructor( ) { }

  setDeleteId(id: string): void {
    this.deleteId = id;
  }

  setDeleteState(state: boolean): void {
    this.recordDeleted = state;
  }

  getDeleteState(): boolean {
    return this.recordDeleted;
  }

  getDeleteId(): string {
    return this.deleteId;
  }

  setFacility(facility: Facility): void {
    this.selectedFacility = facility;
  }

  getFacility(): Facility {
    return this.selectedFacility;
  }

  getAddedState(): boolean {
    return this.recordAdded;
  }

  setAddedState(state:boolean): void {
    this.recordAdded = state;
  }

}
