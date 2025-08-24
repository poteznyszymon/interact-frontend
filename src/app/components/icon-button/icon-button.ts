import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-icon-button',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './icon-button.html',
  styleUrls: ['./icon-button.css'],
})
export class IconButton {
  @Input() icon!: LucideIconData;
  @Input() tooltipTitle?: string = '';
  @Input() tooltipSubTitle?: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
}
