import { Component, OnInit } from '@angular/core';
import { FacilitiesService } from '../../../services/facilities.service';
import { ShareDataService } from '../../../services/share-data.service';
import { Facility } from '../../../types';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})

export class DeleteDialogComponent implements OnInit {    
  
  constructor(
    private facility:FacilitiesService,
    private shareDataService:ShareDataService
    ) { }

  selectedFacility: Facility = this.shareDataService.getFacility();


  ngOnInit(): void {
  }

  deleteRecord() {    
    this.facility.deleteData(this.shareDataService.getDeleteId()).subscribe();
    this.shareDataService.setDeleteState(true);
  }

}
