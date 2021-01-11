import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.models';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;

  constructor() { }

  ngOnInit() {
    this.user = new UserModel();
    // this.user.email = 'japc.testing@gmail.com';
   }


  onSubmit(form: NgForm): void {
    if (form.invalid) { return; }

    console.log('Form send');
    console.log(this.user);
    console.log(form);
  }
}
