import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

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

  openSidebar() { this.showSidebar.set(true); }
  closeSidebar() { this.showSidebar.set(false); }

}