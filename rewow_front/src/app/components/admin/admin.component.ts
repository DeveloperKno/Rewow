import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  menu: Menu[] = [];
  private idUsuario = 1;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(
    private _menuServices: MenuService,
    private observer: BreakpointObserver,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    this._menuServices.listMenu().subscribe((data) => {
      this.menu = data;
    });
  }

  logout() {
    this._authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('auth_token'); // fallback
        this.router.navigate(['/login']);
      },
    });
  }
}
