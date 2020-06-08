import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookApiService } from 'src/app/services/book.service';
import { MatIconModule } from '@angular/material/icon';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.scss']
})
export class DeletePopUpComponent implements OnInit {
  private readonly notifier: NotifierService;
  constructor(public dialogRef: MatDialogRef<DeletePopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
   notifierService: NotifierService,private api: BookApiService,public dialog: MatDialog, public router:Router,
   private _snackBar: MatSnackBar) {
     this.notifier = notifierService;
  }

  ngOnInit() {

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  yes() {
    this.api.deleteAddress(this.data.id).subscribe(deleteAddress => {
      this.getAddress(true);
      this.openSnackBar("Address Deleted Successfully","");
    }, error => {
      this.getAddress(false);
      this.openSnackBar("There was something that went wrong please try again.","");
    });
  }
  getAddress(flag){
    let addresses = [];
    this.api.getAll().subscribe(x => {
      x.forEach(item => {
        addresses.push({
          id:item.id,
          firstname: item.firstname,
          surname: item.surname,
          mobile: item.mobile,
          home: item.home,
          email: item.email,
          lastUpdated: item.lastUpdated,
          actions: ''
        });
      });
      this.dialogRef.close({ event: 'close', data:{addresses:addresses,value:flag}});
    });
  }
  no() {
    this.getAddress(false);
    this.openSnackBar("You have cancelled your request.","");

  }

}
