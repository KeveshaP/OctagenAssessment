import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './pages/view/view.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { UploadComponent } from './pages/upload/upload.component';


const routes: Routes = [
  { path: '', component: ViewComponent },
  { path: 'view', component: ViewComponent },
  { path: 'upload', component: UploadComponent },

  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },

];
    
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
