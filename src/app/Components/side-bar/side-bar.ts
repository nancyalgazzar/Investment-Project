import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
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

  select(item: SidebarItem) {
    this.selected.set(item);
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  logout() {

    this.authService.logout();
    this.router.navigate(['']);

  }

  openSidebar() { this.showSidebar.set(true); }
  closeSidebar() { this.showSidebar.set(false); }

}