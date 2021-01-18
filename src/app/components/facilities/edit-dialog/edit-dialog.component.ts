import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../../services/share-data.service';
import { Facility } from '../../../types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  constructor(
    private shareDataService: ShareDataService,
    private facilityService: FacilitiesService,
    private dialog: MatDialogRef<EditDialogComponent>
  ) {}

  selectedFacility: Facility = this.shareDataService.getFacility();

  facilityForm = new FormGroup({
    facilityName: new FormControl('', [Validators.required]),
    shortCode: new FormControl('', [Validators.required]),
    idDs: new FormControl('', [Validators.required]),
    activity: new FormControl(false),
    id: new FormControl(this.selectedFacility.id),
  });

  ngOnInit(): void {
    this.facilityForm = new FormGroup({
      facilityName: new FormControl(this.selectedFacility.facilityName),
      shortCode: new FormControl(this.selectedFacility.shortCode),
      idDs: new FormControl(this.selectedFacility.idDs),
      activity: new FormControl(this.selectedFacility.activity),
      id: new FormControl(this.selectedFacility.id),
    });
  }

  saveFacility(): void {
    console.log('Saved');
    const DATA = JSON.parse(JSON.stringify(this.facilityForm.getRawValue()));
    console.log(DATA);
    this.facilityService
      .updateData(DATA)
      .toPromise()
      .then((result) => console.log(`Saved - ${result}`))
      .catch(err => console.log(err));
    this.dialog.close();
  }
}
