import { Component, OnInit, ViewChild } from '@angular/core';
import { FacilitiesService } from '../../services/facilities.service';
import { ShareDataService } from '../../services/share-data.service';
import { AuthService } from '../../services/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { NewDialogComponent } from './new-dialog/new-dialog.component';
import { Facility } from '../../types';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css'],
})
export class FacilitiesComponent implements OnInit {
  username: string = '';

  displayedColumns: string[] = [
    'facilityName',
    'shortCode',
    'idDs',
    'activity',
    'edit',
    'delete',
  ];
 
  dataSource!: MatTableDataSource<any>;
  recordCount: number = 0;

  constructor(
    private facilitiesService: FacilitiesService,
    public dialog: MatDialog,
    private shareDataService: ShareDataService,
    private auth: AuthService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getData();
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
    this.facilitiesService
      .listData()
      .toPromise()
      .then((data: Facility[]) => {
        console.log('Data : ', data);
        let array = data.map((fac) => {return { ...fac }});
        this.recordCount = array.length;
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);
      })
      .catch((err) => console.log(err));
  }

  deleteDialog(facility: Facility): void {
    this.shareDataService.setDeleteId(`${facility.id}`);
    const selectedFacility: Facility = {...facility};
    this.shareDataService.setFacility(selectedFacility);
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .toPromise()
      .then(() => this.getData())
      .catch((err) => console.log(err));
  }

  editDialog(facility: Facility): void {
    const selectedFacility: Facility = {...facility};
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
