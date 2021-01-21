import { Component, OnInit } from '@angular/core';
import { FacilitiesService } from '../../../services/facilities.service';
import { ShareDataService } from '../../../services/share-data.service';
import { Facility } from '../../../types';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    private facilityService: FacilitiesService,
    private shareDataService: ShareDataService,
    private dialog: MatDialogRef<DeleteDialogComponent>
  ) {}

  selectedFacility!: Facility;

  ngOnInit(): void {
    this.selectedFacility = this.shareDataService.getFacility();
  }

  deleteRecord(): void {
    const ID = this.shareDataService.getDeleteId();
    this.facilityService
      .deleteData(ID)
      .toPromise()
      .then(result => console.log(result))
      .catch(err => console.log(err));
    this.dialog.close();
  }
  
}
