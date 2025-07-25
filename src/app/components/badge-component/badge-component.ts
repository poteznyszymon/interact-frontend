import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, VerifiedIcon } from 'lucide-angular';

@Component({
  selector: 'app-badge-component',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './badge-component.html',
  styleUrl: './badge-component.css',
})
export class BadgeComponent {
  @Input() text = '';
  @Input() type:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'verified' = 'primary';

  get badgeClass() {
    return {
      'badge-primary': this.type === 'primary',
      'badge-secondary': this.type === 'secondary',
      'badge-destructive': this.type === 'destructive',
      'badge-outline': this.type === 'outline',
      'badge-verified': this.type === 'verified',
    };
  }

  verifiedIcon = VerifiedIcon;
}
