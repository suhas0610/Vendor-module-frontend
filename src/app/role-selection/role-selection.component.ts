import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.css']
})
export class RoleSelectionComponent {
  selectedRole: string | null = null;
  selectedVendor: string = '';
  vendors = [
    { id: '1', name: 'TechTrain Solutions' },
    { id: '2', name: 'SkillWave Learning' },
    { id: '3', name: 'InspireEdge Consulting' }
  ];

  constructor(private router: Router) {}

  onRoleChange(event: any) {
    this.selectedVendor = '';
  }

  onVendorSelect(event: any) {}

  proceed() {
    if (this.selectedRole === 'ld') {
      this.router.navigate(['/ld/requests']);
    } else if (this.selectedRole === 'vendor' && this.selectedVendor) {
      this.router.navigate(['/vendor/portal', this.selectedVendor]);
    }
  }
}
