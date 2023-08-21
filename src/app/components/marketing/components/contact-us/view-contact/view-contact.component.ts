import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContatUsService } from '../../../services/contat-us.service';

@Component({
  selector: 'ngx-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactservice:ContatUsService

  ){}
  contact:any
  ngOnInit(): void {
    this.getContact(this.data.id)
  }
  getContact(id){
    let pay={
      id:id
    }
    this.contactservice.getContactFormById(pay).subscribe(
      (res)=>{
        this.contact=res
      }
    )
  }
  closeDialog() {
    this.dialogRef.close({isAdd:true});
  }
  

}
