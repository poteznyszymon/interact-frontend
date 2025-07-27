import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { ToastService } from '../toast/toast-service';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginLoading = new BehaviorSubject<boolean>(false);
  private logoutLoading = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService
  ) {}

  private headers = { 'Content-Type': 'application/json' };

  public async login(username: string, password: string): Promise<void> {
    try {
      this.loginLoading.next(true);
      await firstValueFrom(
        this.httpClient.post(
          `${environment.baseApiUrl}/auth/login`,
          {
            username,
            password,
          },
          { headers: this.headers, withCredentials: true }
        )
      );
      await this.fetchCurrentUser();
    } catch (error: any) {
      if (
        error instanceof HttpErrorResponse &&
        error.error?.detail === 'Bad credentials'
      ) {
        this.toastService.add('Invalid credentials', 'error');
      } else {
        this.toastService.add('Something went wrong', 'error');
      }
    } finally {
      this.loginLoading.next(false);
    }
  }

  public async logout(): Promise<void> {
    try {
      this.logoutLoading.next(true);
      await firstValueFrom(
        this.httpClient.post(
          `${environment.baseApiUrl}/auth/logout`,
          {},
          {
            withCredentials: true,
            responseType: 'text',
          }
        )
      );
      this.currentUser.next(null);
    } catch (error: any) {
      console.log(error);
      this.toastService.add('Something went wrong', 'error');
    } finally {
      this.logoutLoading.next(false);
    }
  }

  public async fetchCurrentUser(): Promise<void> {
    try {
      const user = await firstValueFrom(
        this.httpClient.get<any>(`${environment.baseApiUrl}/auth/current`, {
          withCredentials: true,
        })
      );
      this.currentUser.next(user);
    } catch (error: any) {
      console.log(error);
      this.currentUser.next(null);
      /*
      if (error instanceof HttpErrorResponse) {
        this.toastService.add('Failed to fetch user data', 'error');
      } else {
        this.toastService.add('Something went wrong', 'error');
      }
        */
    }
  }

  public getLoginLoading(): Observable<boolean> {
    return this.loginLoading.asObservable();
  }

  public getLogoutLoading(): Observable<boolean> {
    return this.logoutLoading.asObservable();
  }

  public getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  public isUserAuthenticated(): Observable<boolean> {
    return this.currentUser.asObservable().pipe(map((user) => !!user));
  }
}
