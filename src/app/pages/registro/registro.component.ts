import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;
  rememberUser: false;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
    // this.user.email = 'japc.testing@gmail.com';
   }


  onSubmit(form: NgForm): void {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Wait please...',
    });

    Swal.showLoading();

    this.auth.newUser(this.user)
      .subscribe( resp => {
        console.log(resp);
        Swal.close();

        if (this.rememberUser) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('/home');
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          text: err.error.error.message
        });
      });

    console.log('Form send');
    console.log(this.user);
    console.log(form);
  }
}
