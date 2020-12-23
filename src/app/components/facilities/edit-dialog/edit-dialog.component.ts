import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../../services/share-data.service';
import { Facility } from '../../../types';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(private shareDataService:ShareDataService) { }

  selectedFacility: Facility = this.shareDataService.getFacility();
  checked: boolean = false;

  facilityForm = new FormGroup({
    facilityName:new FormControl(''),
    shortCode:new FormControl(''),
    idDs:new FormControl(''),   
  });


  ngOnInit(): void {
    if (this.selectedFacility.activity === "Yes") {
      this.checked = true;
    }
    console.log(this.checked);
  
  }
   

  saveFacility(): void {
    console.log('Saved');
    console.log(this.facilityForm.value);
  }

}
