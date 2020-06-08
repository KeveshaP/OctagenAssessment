import { Component, OnInit } from '@angular/core';
import { BookApiService } from 'src/app/services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editData:any;
  
  constructor(private api:BookApiService,private _snackBar: MatSnackBar, private router:Router, private route:ActivatedRoute) { }

  ngOnInit( ) {
    this.route.params.subscribe(x=>{
      this.api.getAddressById(parseInt(x.id)).subscribe(editData=>{
        this.editData = editData;
      });
    });
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  save(){
    this.editData.lastUpdated = new Date();
    this.api.putFile(this.editData).subscribe(x=>{
      this.openSnackBar("Successfully Updated.","");
      this.router.navigateByUrl("")

    },error=>{
      this.openSnackBar("An Error Occured please try again.","");

    });
  }
  cancel(){
    this.router.navigateByUrl("")
  }
}
