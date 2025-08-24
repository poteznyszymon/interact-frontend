import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { AuthService } from '../../service/auth/auth-service';
import {
  ChevronDown,
  ChevronsLeft,
  FilePen,
  LucideAngularModule,
  Settings,
} from 'lucide-angular';
import { SidebarService } from '../../service/ui/sidebar-service';
import { IconButton } from '../icon-button/icon-button';
import { UserAvatar } from '../user-avatar/user-avatar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-component',
  imports: [
    ResizableModule,
    CommonModule,
    LucideAngularModule,
    IconButton,
    UserAvatar,
  ],
  templateUrl: './side-bar-component.html',
  styleUrls: ['./side-bar-component.css'],
})
export class SideBarComponent {
  authService: AuthService = inject(AuthService);
  sidebarService: SidebarService = inject(SidebarService);
  router: Router = inject(Router);

  user$ = this.authService.getCurrentUser();
  isCollapsed$ = this.sidebarService.getIsCollapsed();

  dropdownOpen = signal(false);

  ngOnInit(): void {
    const width = localStorage.getItem('sidebar-width');
    if (width) {
      this.width = parseInt(width);
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  // sidebar constraints and default width
  width: number = 300;
  minWidth: number = 240;
  maxWidth: number = 336;

  toggleDropdown() {
    this.dropdownOpen.update((value) => !value);
  }

  toggleSidebar(event?: Event) {
    event?.stopPropagation();
    this.sidebarService.toggle();
  }

  resizing(event: ResizeEvent): void {
    this.width = Math.min(
      Math.max(event.rectangle.width || this.width, this.minWidth),
      this.maxWidth
    );
    localStorage.setItem('sidebar-width', this.width.toString());
  }

  readonly ChevronsLeft = ChevronsLeft;
  readonly ChevronDown = ChevronDown;
  readonly FilePen = FilePen;
  readonly Settings = Settings;

  // close side bar on Ctrl + \
  @HostListener('document:keydown', ['$event'])
  handleShortcut(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === '\\') {
      this.sidebarService.toggle();
    }
  }

  // close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.sidebar-header-content');
    if (!clickedInside) {
      this.dropdownOpen.set(false);
    }
  }
}
