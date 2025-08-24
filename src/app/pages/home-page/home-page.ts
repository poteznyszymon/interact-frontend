import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';
import { Router } from '@angular/router';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../service/ui/sidebar-service';

@Component({
  selector: 'app-home-page',
  imports: [CustomButton, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  authService = inject(AuthService);
  sidebarService = inject(SidebarService);
  router = inject(Router);

  user$ = this.authService.getCurrentUser();
  isCollapsed$ = this.sidebarService.getIsCollapsed();

  async onLogout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  openDialog() {
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }
}
