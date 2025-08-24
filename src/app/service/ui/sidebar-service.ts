import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private readonly sidebarCollapsedKey = 'sidebar-collapsed';
  private isCollapsed = new BehaviorSubject<boolean>(
    this.loadStateFromStorage()
  );

  private loadStateFromStorage(): boolean {
    const state = localStorage.getItem(this.sidebarCollapsedKey);
    return state ? JSON.parse(state) : false;
  }

  public toggle(): void {
    this.isCollapsed.next(!this.isCollapsed.value);
    localStorage.setItem(
      this.sidebarCollapsedKey,
      this.isCollapsed.value.toString()
    );
  }

  public getIsCollapsed(): Observable<boolean> {
    return this.isCollapsed.asObservable();
  }
}
