import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication-service';

type SidebarItem = 'dashboard' | 'security' | 'profile' | 'identity' | 'risk' | 'projects';
@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  selected = signal<SidebarItem>('dashboard');
  showSidebar = signal(false); // ← start false, CSS handles md+

  // Variables to hold the dynamic user data
  userName: string = 'Investor';
  userRole: string = 'User';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}
  ngOnInit() {
    // 1. Grab the user from local storage
    const userStorage = localStorage.getItem('currentUser');

    if (userStorage) {
      const userObj = JSON.parse(userStorage);
      const currentUser = Array.isArray(userObj) ? userObj[0] : userObj;

      // 2. Set the name (combining first and last)
      this.userName =
        `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() || 'Investor';

      // 3. Set the role and capitalize the first letter (e.g., "user" -> "User")
      if (currentUser.role) {
        this.userRole = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
      }
    }
  }
  select(item: SidebarItem) {
    this.selected.set(item);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  openSidebar() {
    this.showSidebar.set(true);
  }
  closeSidebar() {
    this.showSidebar.set(false);
  }
}
