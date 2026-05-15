import { Component, signal } from '@angular/core';

type SidebarItem = 'dashboard' | 'security' | 'profile' | 'identity' | 'risk';
@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  selected = signal<SidebarItem>('dashboard');
  showSidebar = signal(false); // ← start false, CSS handles md+

  select(item: SidebarItem) {
    this.selected.set(item);
  }

  openSidebar() { this.showSidebar.set(true); }
  closeSidebar() { this.showSidebar.set(false); }

}