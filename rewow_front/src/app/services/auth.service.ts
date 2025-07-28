import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlAPI = enviroment.urlEndPoint;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(this.urlAPI + '/login', {
      email,
      password,
    });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): Observable<any> {
    return this.http.post(this.urlAPI + '/logout', {}).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
      })
    );
  }
}
