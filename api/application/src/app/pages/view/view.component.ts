import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookApiService } from 'src/app/services/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldControl } from "@angular/material/form-field";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeletePopUpComponent } from './delete-pop-up/delete-pop-up.component';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgControlStatus } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  ELEMENT_DATA: any[] = [];
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  dataSource: any;
  uploadForm: FormGroup;
  displayedColumns: string[] = ['Firstname', 'Surname', 'Mobile', 'Home', 'Email', 'LastUpdated', 'Actions'];

  constructor(private api: BookApiService, public dialog: MatDialog, public router: Router, private _snackBar: MatSnackBar,private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getAddresses();
  }

  onClick(){
    this.router.navigateByUrl("upload")
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getAddresses() {
    this.api.getAll().subscribe(addresses => {
      this.dataSource = [];
      this.ELEMENT_DATA = [];
      addresses.forEach(item => {
        this.ELEMENT_DATA.push({
          id: item.id,
          firstname: item.firstname,
          surname: item.surname,
          mobile: item.mobile,
          home: item.home,
          email: item.email,
          lastUpdated: item.lastUpdated,
          actions: ''
        });
      });
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      
    });
  }

  edit(item) {
    this.router.navigateByUrl(`edit/${item.id}`);
  }

  delete(item) {
    const dialogRef = this.dialog.open(DeletePopUpComponent, {
      width: '250px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ELEMENT_DATA = [];

      if (result.data.value) {
        this.dataSource=[];
        this.dataSource = new MatTableDataSource(result.data.addresses);
      } else {
        this.dataSource=[];
        this.getAddresses();
      }
    });
  }

  add() {
    this.router.navigateByUrl("add")
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatLongDate(date: Date) {
    const newDate = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return newDate.getDate() + ' ' + months[newDate.getMonth()] + ' ' + newDate.getFullYear();
  }
}
