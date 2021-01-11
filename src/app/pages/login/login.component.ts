import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  rememberUser = false;

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    if ( localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.rememberUser = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Wait please...'
    });

    Swal.showLoading();

    return this.auth.login(this.user)
      .subscribe(resp => {
        console.log(resp);
        Swal.close();

        if ( this.rememberUser) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('/home');
      }, (err) => {
        // console.log(err.error.error.message);
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          text: err.error.error.message
        });
      });
  }
}
