import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = new UserModel();
    // this.user.email = 'japc.testing@gmail.com';
   }


  onSubmit(form: NgForm): void {
    if (form.invalid) { return; }

    this.auth.newUser(this.user)
      .subscribe( resp => {
        console.log(resp);
      }, (err) => {
        console.log(err.error.error.message);
      });

    console.log('Form send');
    console.log(this.user);
    console.log(form);
  }
}
