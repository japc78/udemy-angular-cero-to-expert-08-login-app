import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.invalid) { return; }

    return this.auth.login(this.user)
      .subscribe(resp => {
        console.log(resp);
      }, (err) => {
        console.log(err.error.error.message);
      });
  }
}
