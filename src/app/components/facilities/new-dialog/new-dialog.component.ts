import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../../services/share-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Facility } from '../../../types';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.css']
})
export class NewDialogComponent implements OnInit {

  newFacility = new FormGroup({
    facilityName:new FormControl(''),
    shortCode:new FormControl(''),
    idDs:new FormControl(''),
    activity:new FormControl(''),
  })


  constructor(private shareDataService:ShareDataService) { }

  ngOnInit(): void {
  }


  addFacilty(): void {
    
    
  }

}
