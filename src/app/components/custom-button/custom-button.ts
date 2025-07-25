import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, Loader2 } from 'lucide-angular';

@Component({
  selector: 'app-custom-button',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.css',
  animations: [
    trigger('tooltipAnimation', [
      state(
        'hidden',
        style({
          opacity: 0,
          visibility: 'hidden',
          transform: 'translateY(0.25rem)',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          visibility: 'visible',
          transform: 'translateY(0)',
        })
      ),
      transition('hidden => visible', [animate('150ms ease-out')]),
      transition('visible => hidden', [animate('150ms ease-in')]),
    ]),
  ],
})
export class CustomButton {
  @Input() type: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() iconButton = false;
  @Input() tooltipText: string | null = null;
  @Input() size: 'default' | 'small' = 'default';

  tooltipVisible = false;

  get buttonClass() {
    return {
      'btn-primary': this.type === 'primary',
      'btn-secondary': this.type === 'secondary',
      'btn-outline': this.type === 'outline',
      'btn-icon': this.iconButton,
      'btn-small': this.size === 'small',
    };
  }

  loadingIcon = Loader2;
}
