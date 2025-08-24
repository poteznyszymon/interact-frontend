import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../service/ui/sidebar-service';
import { ThemeService } from '../../service/theme/theme-service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  themeService = inject(ThemeService);

  toggle() {
    this.themeService.toggleTheme();
  }
}
