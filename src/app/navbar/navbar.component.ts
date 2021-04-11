import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() username: string;
  @Input() isNotLoginPage: boolean;
  isNotRedirectly: boolean;

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    if (this.route.url.indexOf('register') < 1 && this.route.url.length > 1) {
      this.setActivePage();
    } else {
      if (this.route.url.length === 1) {
        localStorage.setItem('currentPage', 'agenda');
      }
    }
  }

  setPage(page) {
    localStorage.setItem('currentPage', page);
  }

  private setActivePage() {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage) {
      switch (currentPage) {
        case 'users': {
          document.getElementById('tab-users').className = 'nav-item active';
          document.getElementById('tab-agenda').className = 'nav-item';
          document.getElementById('tab-stadiums').className = 'nav-item';
          document.getElementById('tab-awards').className = 'nav-item';
          document.getElementById('tab-historical').className = 'nav-item';
          document.getElementById('tab-users-awards').className = 'nav-item';
          this.navigateTo('users');

          break;
        }
        case 'agenda': {
          document.getElementById('tab-users').className = 'nav-item';
          document.getElementById('tab-agenda').className = 'nav-item active';
          document.getElementById('tab-stadiums').className = 'nav-item';
          document.getElementById('tab-awards').className = 'nav-item';
          document.getElementById('tab-historical').className = 'nav-item';
          document.getElementById('tab-users-awards').className = 'nav-item';
          this.navigateTo('agenda');

          break;
        }
        case 'stadiums': {
          document.getElementById('tab-users').className = 'nav-item';
          document.getElementById('tab-agenda').className = 'nav-item';
          document.getElementById('tab-stadiums').className = 'nav-item active';
          document.getElementById('tab-awards').className = 'nav-item';
          document.getElementById('tab-historical').className = 'nav-item';
          document.getElementById('tab-users-awards').className = 'nav-item';
          this.navigateTo('stadiums');

          break;
        }
        case 'awards': {
          document.getElementById('tab-users').className = 'nav-item';
          document.getElementById('tab-agenda').className = 'nav-item';
          document.getElementById('tab-stadiums').className = 'nav-item';
          document.getElementById('tab-awards').className = 'nav-item active';
          document.getElementById('tab-historical').className = 'nav-item';
          document.getElementById('tab-users-awards').className = 'nav-item';
          this.navigateTo('awards');

          break;
        }
        case 'historical': {
          document.getElementById('tab-users').className = 'nav-item';
          document.getElementById('tab-agenda').className = 'nav-item';
          document.getElementById('tab-stadiums').className = 'nav-item';
          document.getElementById('tab-awards').className = 'nav-item';
          document.getElementById('tab-historical').className = 'nav-item active';
          document.getElementById('tab-users-awards').className = 'nav-item';
          this.navigateTo('historical');

          break;
        }

        case 'users-awards': {
          document.getElementById('tab-users').className = 'nav-item';
          document.getElementById('tab-agenda').className = 'nav-item';
          document.getElementById('tab-stadiums').className = 'nav-item';
          document.getElementById('tab-awards').className = 'nav-item';
          document.getElementById('tab-historical').className = 'nav-item';
          document.getElementById('tab-users-awards').className = 'nav-item active';
          this.navigateTo('users-awards');

          break;
        }
      }
    }
  }

  private navigateTo(page) {
    this.route.navigate([`/${page}`]);
  }
}
