import {BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AddComponent } from './pages/add/add.component';
import {EditComponent } from './pages/edit/edit.component';
import {ViewComponent } from './pages/view/view.component';
import {CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AuthInterceptor } from './interceptor/auth-interceptor';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {NotifierModule } from "angular-notifier";
import {MatDialogModule} from '@angular/material/dialog';
import {DeletePopUpComponent } from './pages/view/delete-pop-up/delete-pop-up.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadComponent } from './pages/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    ViewComponent,
    UploadComponent,
    DeletePopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NotifierModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,   
    MatProgressBarModule  
  ],
  entryComponents: [
    DeletePopUpComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
