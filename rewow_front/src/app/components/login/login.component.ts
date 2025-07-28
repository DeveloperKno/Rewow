import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  email = '';
  password = '';
  returnUrl: string = '/admin';

  constructor(
    private fb: FormBuilder,
    private _SnackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  login() {
    this.loading = true;

    this._authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this._authService.saveToken(res.token);
        console.log('entro: ', this.returnUrl);

        this.router.navigateByUrl(this.returnUrl);
        // this.router.navigate(['admin']);
        this.loading = false;
      },
      error: (err) => {
        this._SnackBar.open(
          'Login fallido. Verifica tus credenciales.',
          'Cerrar'
        );
        this.loading = false;
      },
    });
  }
}
