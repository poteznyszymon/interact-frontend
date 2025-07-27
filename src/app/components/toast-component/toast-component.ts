import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButton } from '../custom-button/custom-button';
import { animate, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Toast, ToastService } from '../../service/toast/toast-service';

@Component({
  standalone: true,
  selector: 'app-toast-component',
  imports: [CommonModule, CustomButton, DragDropModule],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class ToastComponent {
  toasts$: BehaviorSubject<Toast[]>;
  totalToasts = 0;

  constructor(private toastService: ToastService) {
    this.toasts$ = toastService.toasts$;

    this.toasts$.subscribe((toasts) => {
      this.totalToasts = toasts.length;
    });
  }

  handleClose(id: number) {
    this.toastService.remove(id);
  }

  onDragEnd(event: any, toastId: number) {
    const distance = event.distance.x;

    if (distance > 50) {
      this.toastService.remove(toastId);
    } else {
      const element = event.source.getRootElement() as HTMLElement;
      element.style.transition = 'transform 0.3s ease';
      element.style.transform = 'translateX(0)';

      setTimeout(() => {
        element.style.transition = '';
      }, 300);
    }
  }

  onDragMoved(event: any) {
    const element = event.source.getRootElement() as HTMLElement;
    const x = event.distance.x;

    if (x < 0) {
      element.style.transform = `translateX(0px)`;
    }
  }

  getScale(position: number): number {
    if (this.totalToasts <= 1) return 1;
    const relative = position / (this.totalToasts - 1);
    return 0.8 + relative * 0.2;
  }

  getOpacity(position: number): number {
    if (this.totalToasts <= 1) return 1;
    const relative = position / (this.totalToasts - 1);
    return 0.5 + relative * 0.5;
  }
}
