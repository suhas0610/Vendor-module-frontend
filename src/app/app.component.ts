import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavigation = false;
  isLdRole = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavigation = !event.url.includes('role-selection') && event.url !== '/';
        this.isLdRole = event.url.startsWith('/ld/');
      }
    });
  }

  changeRole() {
    this.router.navigate(['/']);
  }
}
