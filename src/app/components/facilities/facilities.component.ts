import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FacilitiesService } from '../../services/facilities.service';
import { ShareDataService } from '../../services/share-data.service';
import { AuthService } from '../../services/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { NewDialogComponent } from './new-dialog/new-dialog.component';
import { PeriodicElement, Facility } from '../../types';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css'],
})
export class FacilitiesComponent implements AfterViewInit, OnInit {
  username: string = '';

  displayedColumns: string[] = [
    'facilityName',
    'shortCode',
    'idDs',
    'activity',
    'edit',
    'delete',
  ];

  table_data: PeriodicElement[] = [];
  dataSource: PeriodicElement[] = [];
  recordCount: number = 0;

  constructor(
    private facilitiesService: FacilitiesService,
    public dialog: MatDialog,
    private shareDataService: ShareDataService,
    private auth: AuthService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
  }

  random(): void {
    this.facilitiesService
      .random()
      .toPromise()
      .then((n) => console.log(n))
      .catch((err) => console.log(err));
  }

  logout(): void {
    console.log('From Facilities.ts');
    this.auth
      .logout()
      .toPromise()
      .then(() => console.log('Logout Succeeded'))
      .catch((err) => console.log(err));
  }

  getData(): void {
    this.table_data = [];
    this.facilitiesService
      .listData()
      .toPromise()
      .then((data: Facility[]) => {
        console.log('Data : ', data);
        for (let element of data) {
          let facility: PeriodicElement = {
            facilityName: element.facilityName,
            shortCode: element.shortCode,
            idDs: element.idDs,
            activity: element.activity,
            edit: 'edit',
            delete: 'delete',
            id: element.id,
          };
          this.table_data.push(facility);
        }
        this.recordCount = this.table_data.length;
        this.dataSource = this.table_data;
        // this.dataSource.sort = this.sort;

        console.log(this.dataSource);
      })
      .catch((err) => console.log(err));
  }

  deleteDialog(facility: PeriodicElement): void {
    this.shareDataService.setDeleteId(`${facility.id}`);
    const selectedFacility: Facility = {
      facilityName: facility.facilityName,
      shortCode: facility.shortCode,
      idDs: facility.idDs,
      activity: facility.activity,
      id: facility.id,
    };
    this.shareDataService.setFacility(selectedFacility);
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .toPromise()
      .then(() => this.getData())
      .catch((err) => console.log(err));
  }

  editDialog(facility: PeriodicElement): void {
    const selectedFacility: Facility = {
      facilityName: facility.facilityName,
      shortCode: facility.shortCode,
      idDs: facility.idDs,
      activity: facility.activity,
      id: facility.id,
    };
    this.shareDataService.setFacility(selectedFacility);

    this.dialog
      .open(EditDialogComponent, { width: '400px' })
      .afterClosed()
      .toPromise()
      .then(() => this.getData())
      .catch((err) => console.log(err));
  }

  addDialog(): void {
    this.dialog
      .open(NewDialogComponent, { width: '400px' })
      .afterClosed()
      .toPromise()
      .then(() => this.getData())
      .catch((err) => console.log(err));
  }
}
