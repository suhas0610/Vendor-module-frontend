import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorManagementComponent } from './vendor-management/vendor-management.component';
import { TrainingRequestManagementComponent } from './training-request-management/training-request-management.component';
import { TrainerProfileManagementComponent } from './trainer-profile-management/trainer-profile-management.component';
import { TrainerHistoryComponent } from './trainer-history/trainer-history.component';
import { VendorPortalComponent } from './vendor-portal/vendor-portal.component';
import { RoleSelectionComponent } from './role-selection/role-selection.component';

const routes: Routes = [
  { path: '', component: RoleSelectionComponent },
  { 
    path: 'ld',
    children: [
      { path: 'vendors', component: VendorManagementComponent },
      { path: 'requests', component: TrainingRequestManagementComponent },
      { path: 'profiles', component: TrainerProfileManagementComponent },
      { path: 'history', component: TrainerHistoryComponent }
    ]
  },
  { 
    path: 'vendor',
    children: [
      { path: 'portal/:vendorId', component: VendorPortalComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
