import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Lock, LockOpen, LucideAngularModule } from 'lucide-angular';
import { CustomButton } from '../custom-button/custom-button';
import { BadgeComponent } from '../badge-component/badge-component';

@Component({
  selector: 'app-input-component',
  imports: [CommonModule, LucideAngularModule, CustomButton],
  templateUrl: './input-component.html',
  styleUrl: './input-component.css',
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Input() labelText: string = '';
  @Input() passwordSwitch: boolean = false;

  lockIcon = Lock;
  lockOpenIcon = LockOpen;

  locked = signal(true);

  handleLockChange() {
    this.locked.update((prev) => !prev);
  }
}
