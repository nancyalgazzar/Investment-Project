import { NgClass } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';

type SidebarItem = 'dashboard' | 'security' | 'profile' | 'identity' | 'risk';
@Component({
  selector: 'app-side-bar',
  imports: [NgClass],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  selected = signal<SidebarItem>('dashboard');
  showSidebar = signal(true);
  select(item: SidebarItem) {
    this.selected.set(item);
  }
  ngOnInit() {
    if (window.innerWidth < 768) {
      this.showSidebar.set(false);
    }
  }
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 768) {
      this.showSidebar.set(false);
    } else {
      this.showSidebar.set(true);
    }
  }
}
