import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { Router } from '@angular/router';
import { concat } from 'rxjs';
import { DataserviceService } from '../service/dataservice.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
})
export class PersonalInfoComponent implements OnInit {
  //this line sets defualt rating in the 
  currentRate = 9;

  images = ['assets/scroll.jpg', 'assets/scroll2.jpg', 'assets/scroll3.jpg', 'assets/scroll2.jpg'];

  list = [
    { title: 'Tenet', show: true, img: 'assets/twilight_small.jpg', rating: '2' },
    { title: 'Twilight 2', show: true, img: 'assets/twilight2_small.jpg', rating: '3' },
    { title: 'Twilight 3', show: true, img: 'assets/twilight2_small.jpg', rating: '4' },
  ];



  // list = [
  //   { title: 'Nodejs', show: true, img: 'assets/me.jpg' },
  //   { title: 'Javascript', show: false, img: 'assets/me.jpg' },
  //   { title: 'Angular', show: true, img: 'assets/me.jpg' },
  //   { title: 'express', show: true, img: 'assets/me.jpg' },
  //   { title: 'ajax', show: true, img: 'assets/me.jpg' },
  //   { title: 'bootstrap', show: true, img: 'assets/me.jpg' },
  // ];

  constructor(private modalService: NgbModal,
    private router: Router,
    private sharedata: DataserviceService) { }

  ngOnInit(): void {
    this.sharedata.sendData(this.list);
  }

  myfun() {
    console.log("hello rating function" + this.currentRate);
  }

  showDetailsModal(item) {
    console.log(item);

    const modalRef = this.modalService.open(DetailsModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.data = item;
  }


  contentPage(title) {
    // console.log(title);
    let temp = '/home/' + title;

    this.router.navigate([temp]);
  }
}
