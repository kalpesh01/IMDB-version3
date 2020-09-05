import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../service/dataservice.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tenet',
  templateUrl: './tenet.component.html',
  styleUrls: ['./tenet.component.css']
})
export class TenetComponent implements OnInit {
  public star = faStar;
  public currentRate = 8;
  public sessId = sessionStorage.getItem('sid');
  constructor(private sharedata: DataserviceService, private http: HttpClient) { }
  list = [];
  comments = [];
  AvgRating = "";
  ngOnInit(): void {
    this.list = this.sharedata.receiveData();
    this.getAvgRat();
    this.getComments();
  }

  async getAvgRat() {
    const data = { mname: this.list[0].title };
    const url = 'http://localhost:3000/getAvgRat';
    const result: any = await this.http.post(url, data).toPromise();
    console.log(result);
    this.AvgRating = result;
  }

  async getComments() {
    const data = { mname: this.list[0].title };
    const url = 'http://localhost:3000/getcomments';
    const result: any = await this.http.post(url, data).toPromise();
    console.log(result);
    this.comments = result;
    console.log(this.comments[0].comments);
    console.log(this.comments[0].uid);
  }


  async commentHere(cmt) {
    const objcmt = {
      mname: this.list[0].title,
      uid: this.sessId,
      cmt: cmt.value
    }
    console.log(objcmt);
    const url = 'http://localhost:3000/addcomment';
    const result: any = await this.http.post(url, objcmt).toPromise();
    console.log(result);
    this.getComments();

  }


  async ratingfun() {

    const objrat = {
      mname: this.list[0].title,
      uid: this.sessId,
      rating: this.currentRate
    }

    const url = 'http://localhost:3000/addRating';
    const result: any = await this.http.post(url, objrat).toPromise();
    console.log(result);
  }

}
