import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ld-navigation',
  template: `
    <nav mat-tab-nav-bar>
      <a mat-tab-link
         *ngFor="let link of links"
         [routerLink]="link.path"
         routerLinkActive="active"
         [active]="isActive(link.path)">
        {{link.label}}
      </a>
    </nav>
  `,
  styles: [`
    .active {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `]
})
export class LdNavigationComponent {
  links = [
    { path: '/ld/vendors', label: 'Vendor Management' },
    { path: '/ld/requests', label: 'Training Requests' },
    { path: '/ld/profiles', label: 'Trainer Profiles' },
    { path: '/ld/history', label: 'Trainer History' }
  ];

  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.isActive(path, true);
  }
}
