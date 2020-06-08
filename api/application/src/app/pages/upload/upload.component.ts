import { Component, OnInit } from '@angular/core';
import { BookApiService } from 'src/app/services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  fileContent:any;
  dataSource:any[]=[];
  displayedColumns: string[] = ['Firstname', 'Surname', 'Mobile', 'Home', 'Email', 'LastUpdated'];

  constructor(private api:BookApiService,private _snackBar: MatSnackBar, private router:Router, private route:ActivatedRoute) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
   
  }
  back(){
    this.router.navigateByUrl("");
  }

  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let lines = [];
    this.dataSource=[];
    let content = [];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
      lines = self.fileContent.trim().split(";");
      lines.forEach(line=>{
        content = line.trim().split(",");
        if(content[0]){
          self.dataSource.push({
            id:Math.floor((Math.random() * 500) + 1),
            firstname:content[0],
            surname:content[1],
            mobile:content[2],
            home:content[3],
            email:content[4],
            lastUpdated:new Date (content[5])
          });
        }
      });
      self.upload(self.dataSource);
    }
    fileReader.readAsText(file);
  }
  upload(data){
    this.api.postFile(data).subscribe(x=>{
      this.openSnackBar("Your records have been added","");
      this.router.navigateByUrl("")
    },error=>{
      this.openSnackBar("Sorry an error has occours","");
      this.router.navigateByUrl("")
    })
  }

}
