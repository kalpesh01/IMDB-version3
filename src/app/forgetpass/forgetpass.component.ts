import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  public uiInvalidCredential = false;

  public fbFormGroup = this.fb.group({
    email: ['', Validators.required],
    newpassword: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async forgetProcessHere() {
    const data = this.fbFormGroup.value;


    // ajax call
    const url = 'http://localhost:3000/forgetpassword';
    const result: any = await this.http.post(url, data).toPromise();

    console.log(result.affectedRows);

    if (result.affectedRows >= 1) {
      this.router.navigate(['login']);
    } else {
      this.uiInvalidCredential = true;
    }
  }

}
