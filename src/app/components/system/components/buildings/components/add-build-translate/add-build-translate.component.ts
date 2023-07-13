import { NbLayoutDirection } from '@nebular/theme';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { BuildingService } from '../../services/building.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { AddInfoTranslateComponent } from '../../../hospitals/components/add-info-translate/add-info-translate.component';
import { FloorService } from '../../../floors/services/floor.service';
import { RoomService } from '../../../rooms/services/room.service';
import { SpecialService } from '../../../specialities/services/special.service';
import { ClinicService } from '../../../clinics/services/clinic.service';
import { SnackBarService } from '../../../../../../@theme/services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-add-build-translate',
  templateUrl: './add-build-translate.component.html',
  styleUrls: ['./add-build-translate.component.scss']
})
export class AddBuildTranslateComponent implements OnInit {
  formTrans:FormGroup;
  public codes = [{name:'Ar',value:'ar'}, {name:'En',value:'en'}, {name:'Fr',value:'fr'}];
  loading=false
  @Output() onAddTranslate: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddInfoTranslateComponent>,
    private _FormBuilder:FormBuilder,
    private _buildingService:BuildingService,
    private _floorService:FloorService,
    private _roomService:RoomService,
    private _specialService:SpecialService,
    private _clinicService:ClinicService,
    private __helper:HelperService,
    private snackbar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  translationData;
  ngOnInit(): void {
    this.createForm()
    console.log(this.data)
    if(this.data.type === "building"){
      this.getBuildingById(this.data.id)
    }else if(this.data.type === "floor"){
      this.getFloorById(this.data.id)
    }else if(this.data.type === "room"){
      this.getRoomById(this.data.id)
    }else if(this.data.type === "special"){
      this.getSpecialById(this.data.id)
    }else if(this.data.type === "clinic"){
      this.getClinicById(this.data.id)
    }
  }
  get formControls() {
    return this.formTrans.controls;
  }
  builbing;
  getBuildingById(id){
    this._buildingService.getBuildingsById(id).subscribe(
      (res:any)=>{
        this.builbing=res;
        this.translationData=res.buildingTranslation;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  floor;
  getFloorById(id){
    this._floorService.getFloorById(id).subscribe(
      (res:any)=>{
        this.floor=res;
        this.translationData=res.floorTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  room;
  getRoomById(id){
    this._roomService.getRoomById(id).subscribe(
      (res:any)=>{
        this.room=res;
        this.translationData=res.roomTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  special;
  getSpecialById(id){
    this._specialService.getMedicalSpecialById(id).subscribe(
      (res:any)=>{
        this.special=res;
        this.translationData=res.medicalSpecialtyTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  clinic;
  getClinicById(id){
    this._clinicService.getClinicById(id).subscribe(
      (res:any)=>{
        this.clinic=res;
        this.translationData=res.clinicTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  addTrans(data?){
      // console.log(data)

      // this.getGrades(data.school_type)
      this.myFormArray.push(this.createEmailFormGroup(data));

  }
  createForm(): void {
    this.formTrans = this._FormBuilder.group({
      translations: this._FormBuilder.array([this.createEmailFormGroup()])
    });
  }
  get myFormArray(): FormArray {
    return this.formTrans.get('translations') as FormArray;
  }
  public addEmailFormGroup() {

    const emails = this.formTrans.get('translations') as FormArray
    emails.push(this.createEmailFormGroup())
  }

  public removeOrClearEmail(i: number,id:number) {
    console.log("remove",id)
    const languages = this.formTrans.get('translations') as FormArray
    if (languages.length > 1) {
      languages.removeAt(i)
      this.removeTranslation(id)
    } else {
      languages.reset()
    }
  }
  removeTranslation(id:number){
    if(this.data.type === "building"){
      this.delBuildingById(id)
    }else if(this.data.type === "floor"){
      this.delFloorById(id)
    }else if(this.data.type === "room"){
      this.delRoomById(id)
    }else if(this.data.type === "special"){
      this.delSpecialById(id)
    }else if(this.data.type === "clinic"){
      this.delClinicById(id)
    }
  }
  delBuildingById(id){
    this._buildingService.deleteTrans(id).subscribe(
      (res:any)=>{
        if(res.success){
          this.snackbar.open("تم حذف المبني بنجاح ", "ُsuccess", {
            duration: 5000,
            panelClass: 'success'
          });

        }
      }
    )
  }
  delFloorById(id){
    this._floorService.deleteTrans(id).subscribe(
      (res:any)=>{
        if(res.success){
          this.snackbar.open("تم حذف الطابق بنجاح ", "ُsuccess", {
            duration: 5000,
            panelClass: 'success'
          });

        }
      }
    )
  }
  delClinicById(id){
    this._clinicService.deleteTrans(id).subscribe(
      (res:any)=>{
        if(res.success){
          this.snackbar.open("تم حذف العيادة بنجاح ", "ُsuccess", {
            duration: 5000,
            panelClass: 'success'
          });

        }
      }
    )
  }
  delRoomById(id){
    this._roomService.deleteTrans(id).subscribe(
      (res:any)=>{
        if(res.success){
          this.snackbar.open("تم حذف الغرفة بنجاح ", "ُsuccess", {
            duration: 5000,
            panelClass: 'success'
          });

        }
      }
    )
  }
  delSpecialById(id){
    this._specialService.deleteTrans(id).subscribe(
      (res:any)=>{
        if(res.success){
          this.snackbar.open("تم حذف الغرفة بنجاح ", "ُsuccess", {
            duration: 5000,
            panelClass: 'success'
          });

        }
      }
    )
  }
  private createEmailFormGroup(data?): FormGroup {
    console.log(data)
    return this._FormBuilder.group({
      'buildingId':new FormControl(this.data.id),
      'id':new FormControl(data?.id? data?.id :null),
      'LangCode': new FormControl(data?.langCode ? data?.langCode :null, Validators.required),
      'Name': new FormControl(data?.name ? data?.name :null, Validators.required),
      'Description': new FormControl(data?.description ? data?.description :''),


    })
  }
  closeDialog() {
    this.dialogRef.close(this.formTrans.value);
  }
  formData(obj) {
    console.log(obj)
    obj.translations =
    obj?.translations.map((el) => {
      return this.__helper.deleteNullValuesFetchCriteria(el);
    });
    obj.translations = obj.translations.filter((translation) => Object.keys(translation).length !== 0);

    let body = new FormData();
    let bodyObj = {}
    const formVal = obj;
    Object.keys(formVal).forEach((key) => {
      if (formVal[key]) {
        bodyObj[key] = formVal[key]
        if (key == "translations") {
          for (let i = 0; i < formVal['translations'].length; i++) {
            if(this.data.type === 'building'){
              body.append('translations['+(i)+'][BuildeingId]', this.data.id);
            }else if(this.data.type === 'floor'){
              body.append('translations['+(i)+'][FloorId]', this.data.id);
            }else if(this.data.type === 'room'){
              body.append('translations['+(i)+'][RoomId]', this.data.id);
            }else if(this.data.type === 'special'){
              body.append('translations['+(i)+'][MedicalSpecialtyId]', this.data.id);
            }else if(this.data.type === 'clinic'){
              body.append('translations['+(i)+'][ClinicId]', this.data.id);
            }
            body.append('translations['+(i)+'][Id]', formVal.translations[i].id ?formVal.translations[i].id :0);
            body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
            body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);
            body.append('translations['+(i)+'][Description]', formVal.translations[i].Description);

          }
        }
        else {
          body.append(key, formVal[key]);
        }

      }
    });
    return body;
  }
  dataSend;
  save(){
    this.formTrans.markAllAsTouched();
    if (this.formTrans.valid) {
      this.loading=true
      this.dataSend=this.formData(this.formTrans.value)
      if(this.data.type === 'building'){
        this._buildingService.addTranslation(this.data.id,this.dataSend).subscribe(
          (res)=>{
            this.loading=false
            this.closeDialog()
          }
        )
      }else if(this.data.type === 'floor'){
        this._floorService.addTranslation(this.data.id,this.dataSend).subscribe(
          (res)=>{
            this.loading=false

            this.closeDialog()
          }
        )
      }else if(this.data.type === 'room'){
        this._roomService.addTranslation(this.data.id,this.dataSend).subscribe(
          (res)=>{
            this.loading=false

            this.closeDialog()
          }
        )
      }else if(this.data.type === 'special'){
        this._specialService.addTranslation(this.data.id,this.dataSend).subscribe(
          (res)=>{
            this.loading=false

            this.closeDialog()
          }
        )
      }else if(this.data.type === 'clinic'){
        this._clinicService.addTranslation(this.data.id,this.dataSend).subscribe(
          (res)=>{
            this.loading=false

            this.closeDialog()
          }
        )
      }
    }
  }
}
