import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAirFreshener } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public faAirFreshener = faAirFreshener;
  constructor(private router: Router, private modalService: NgbModal) { }
  public sessId = sessionStorage.getItem('sid');

  ngOnInit(): void {
    if (!sessionStorage.getItem('sid')) {
      this.router.navigate(['login']);
    }
  }

  // tslint:disable-next-line:typedef
  processLogout() {

    this.modalService.open(LogoutModalComponent, {
      centered: true,
      // sessionStorage.removeItem('sid');
      // this.router.navigate(['login']);
    });
  }
}
