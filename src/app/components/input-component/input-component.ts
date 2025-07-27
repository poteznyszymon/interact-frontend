import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Host,
  Input,
  Optional,
  signal,
} from '@angular/core';
import { Lock, LockOpen, LucideAngularModule } from 'lucide-angular';
import { CustomButton } from '../custom-button/custom-button';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input-component',
  imports: [
    CommonModule,
    LucideAngularModule,
    CustomButton,
    ReactiveFormsModule,
  ],
  templateUrl: './input-component.html',
  styleUrl: './input-component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() labelText: string = '';
  @Input() passwordSwitch: boolean = false;

  lockIcon = Lock;
  lockOpenIcon = LockOpen;

  locked = signal(true);

  handleLockChange() {
    this.locked.update((prev) => !prev);
  }

  value: string = '';
  isDisabled: boolean = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
