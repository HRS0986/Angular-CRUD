export interface Facility {
  facilityName: string;
  shortCode: string;
  idDs: number;
  activity: "Yes" | "No";
  id?: number;
}

export interface PeriodicElement extends Facility{  
  edit:any;
  delete:any;  
}