import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css'],
})
export class DetailsModalComponent implements OnInit {
  @Input() name;
  @Input() data;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
