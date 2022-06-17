import { classify } from '@angular-devkit/core/src/utils/strings';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  router: any;

  constructor() { }

  ngOnInit(): void {
  }
  signIn(){
    this.router.navigate(['/']);
  }
}
