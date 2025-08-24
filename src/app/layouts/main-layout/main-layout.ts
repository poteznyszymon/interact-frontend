import { Component, inject } from '@angular/core';
import { ThemeService } from '../../service/theme/theme-service';
import {
  ChevronRight,
  ChevronsRight,
  LucideAngularModule,
  Moon,
  Sun,
} from 'lucide-angular';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth/auth-service';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../components/side-bar-component/side-bar-component';
import { SidebarService } from '../../service/ui/sidebar-service';
import { IconButton } from '../../components/icon-button/icon-button';

@Component({
  selector: 'app-main-layout',
  imports: [
    LucideAngularModule,
    RouterOutlet,
    CommonModule,
    SideBarComponent,
    IconButton,
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css', '../layouts.css'],
})
export class MainLayout {
  private themeService: ThemeService = inject(ThemeService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  sidebarService = inject(SidebarService);

  isCollapsed$ = this.sidebarService.getIsCollapsed();

  ChevronsRight = ChevronsRight;
}
