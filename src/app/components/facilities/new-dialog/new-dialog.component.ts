import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.css'],
})
export class NewDialogComponent implements OnInit {
  newFacility = new FormGroup({
    facilityName: new FormControl('', [Validators.required]),
    shortCode: new FormControl('', [Validators.required]),
    idDs: new FormControl('', [Validators.required]),
    activity: new FormControl(false),
  });

  constructor(
    private facilityService: FacilitiesService,    
    private dialog: MatDialogRef<NewDialogComponent>
  ) {}

  ngOnInit(): void {}

  addFacility(): void {  
    const DATA = JSON.parse(JSON.stringify(this.newFacility.getRawValue()));
    this.facilityService
      .addData(DATA)
      .toPromise()
      .then((result) => console.log(`Result - ${result}`))
      .catch(err => console.log(err));
    this.dialog.close();
  }
}
