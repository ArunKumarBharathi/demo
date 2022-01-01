import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import * as EventEmitter from 'events';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit,AfterViewInit {

  @Input() error: any;
  @Output() close=new EventEmitter<void>();

@ViewChild('modalData', {static:false}) modalData:TemplateRef<any>;
  ngOnInit(): void {
    
  }
  closeModal: string;
  
  constructor(private modalService: NgbModal) {
    
  }
  ngAfterViewInit(): void {
    if(this.error){
      this.modalService.open(this.modalData)
    }
  }
    
  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
errorLog(){
  this.close.emit();
  this.modalService.dismissAll();
}
}
