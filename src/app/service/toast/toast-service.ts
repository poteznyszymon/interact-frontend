import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastList: Toast[] = [];
  toasts$ = new BehaviorSubject<Toast[]>([]);

  add(message: string, type: 'success' | 'error', duration?: number ) {
    const toast: Toast = {
      id: Date.now(),
      message,
      type,
      position: 0 // temp
    };

    if (this.toastList.length >= 5) {
      this.toastList.shift(); 
    }

    this.toastList.push(toast);
    this.updatePositions();
    this.toasts$.next([...this.toastList]);

    interval(duration || 5000).subscribe(() => {
      this.remove(toast.id);
    });
  }

  remove(id: number) {
    this.toastList = this.toastList.filter((toast) => toast.id !== id);
    this.updatePositions();
    this.toasts$.next([...this.toastList]);
  }

  private updatePositions() {
    this.toastList.forEach((toast, index) => {
      toast.position = index;
    });
  }

}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
  position: number;
}
