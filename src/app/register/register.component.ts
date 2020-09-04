import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faAirFreshener } from '@fortawesome/free-solid-svg-icons';
import { getLocaleId } from '@angular/common';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public faAirFreshener = faAirFreshener;
  public uiInvalidCredential = false;
  public isValidEmail = false;

  // <!-- input.id,
  // input.name,
  // input.password,
  // input.email,
  // input.birthdate,
  // input.mobile -->


  public fbFormGroup = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
    birthdate: ['', Validators.required],
    mobile: ['', Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    let getid = async () => {
      const url = 'http://localhost:3000/getid';
      const ggid = await this.http.get(url).toPromise();
      let myid: number = ggid[0].id + 1;
      console.log(ggid[0].id + 1);

      this.fbFormGroup.patchValue({ id: myid });
    }
    getid();

  }

  async checkEmail() {
    const data = this.fbFormGroup.value;
    const url = 'http://localhost:3000/checkemail';
    const myres = await this.http.post(url, data).toPromise();
    console.log(myres);
    if (myres != 0) {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = false;
    }
  }

  async registerHere() {
    if (this.isValidEmail == false) {
      const data = this.fbFormGroup.value;
      const url = 'http://localhost:3000/adduser';

      await this.http.post(url, data).toPromise();

      this.router.navigate(['login']);
    }
    else {
      this.uiInvalidCredential = true;
    }
  }
}
