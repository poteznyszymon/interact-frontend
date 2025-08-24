import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-avatar',
  imports: [],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.css',
})
export class UserAvatar {
  @Input() user!: User;
  @Input() size: number = 1;
}
