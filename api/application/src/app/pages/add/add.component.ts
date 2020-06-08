import { Component, OnInit } from '@angular/core';
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BookApiService } from 'src/app/services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  firstname: string="";
  surname: string="";
  mobile: string="";
  home: string = "";
  email: string = "";

  
  constructor(private api:BookApiService,private _snackBar: MatSnackBar, private router:Router, private route:ActivatedRoute) { }

  ngOnInit( ) {
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  save(){
    const data  = {
      id:Math.floor((Math.random() * 500) + 1),
      firstname: this.firstname,
      surname: this.surname,
      mobile:this.mobile,
      home:this.home,
      email:this.email,
      lastUpdated: new Date()
    }
   this.api.postAddress(data).subscribe(x=>{
    this.openSnackBar("Added record successfully","");
    this.router.navigateByUrl("")
   },error=>{

   })
  }
  cancel(){

  }

}
