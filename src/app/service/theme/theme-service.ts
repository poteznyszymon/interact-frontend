import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private dark = 'dark';
  private light = 'light';

  constructor() {
    this.loadInitalTheme();
  }

  get isDarkTheme(): boolean {
    return document.body.classList.contains(this.dark);
  }

  public toggleTheme(): void {
    document.body.classList.toggle(this.dark);
    const isDark = document.body.classList.contains(this.dark);
    localStorage.setItem('theme', isDark ? this.dark : this.light);
  }

  private loadInitalTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add(this.dark);
    } else {
      document.body.classList.remove(this.dark);
    }
  }
}
