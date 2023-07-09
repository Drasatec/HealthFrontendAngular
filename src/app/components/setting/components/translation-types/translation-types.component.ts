import { VisitTypesService } from './../../services/visit-types.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperService } from '../../../../@theme/services/helper.service';
import { BuildingService } from '../../../system/components/buildings/services/building.service';
import { AddInfoTranslateComponent } from '../../../system/components/hospitals/components/add-info-translate/add-info-translate.component';
import { RoomTypesComponent } from '../room-types/room-types.component';
import { TypesService } from '../../services/types.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SsntypesService } from '../../services/ssntypes.service';
import { PeriodtypesService } from '../../services/periodtypes.service';
import { NationalityService } from '../../services/nationality.service';
import { PricecatrgoryService } from '../../services/picecatrgory.service';
import { WorkweekService } from '../../services/workweek.service';

@Component({
  selector: 'ngx-translation-types',
  templateUrl: './translation-types.component.html',
  styleUrls: ['./translation-types.component.scss']
})
export class TranslationTypesComponent implements OnInit {
  formTrans:FormGroup;
  public codes = [{name:'Ar',value:'ar'}, {name:'En',value:'en'}, {name:'Fr',value:'fr'}];

  @Output() onAddTranslate: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddInfoTranslateComponent>,
    private _FormBuilder:FormBuilder,
    private _roomTypesService:TypesService,
    private _visitTypesService:VisitTypesService,
    private _ssnTypesService:SsntypesService,
    private peridService:PeriodtypesService,
    private _nationalservice:NationalityService,
    private _priceService:PricecatrgoryService,
    private _workWeekService:WorkweekService,
    private __helper:HelperService,
    private snackbar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  translationData;
  ngOnInit(): void {
    this.createForm()
    console.log(this.data)
    if(this.data.type === "roomType"){
      this.getRoomTypesById(this.data.id)
    }else if(this.data.type === "visitType"){
      this.getVisitTypesById(this.data.id)
    }else if(this.data.type === "ssnType"){
      this.getSsnTypesById(this.data.id)
    }else if(this.data.type === "workperiods"){
      this.getworkperiodsById(this.data.id)
    }else if(this.data.type === "national"){
      this.getnationalById(this.data.id)
    }else if(this.data.type === "pricecat"){
      this.getpriceById(this.data.id)
    }else if(this.data.type === "workweek"){
      this.getWorkWeek(this.data.id)
    }
  }
  get formControls() {
    return this.formTrans.controls;
  }
  rooms;
  getRoomTypesById(id){
    this._roomTypesService.getRoomTypesById(id).subscribe(
      (res:any)=>{
        this.rooms=res;
        this.translationData=res.roomTypeTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  visits;
  getVisitTypesById(id){
    this._visitTypesService.getvisitTypesById(id).subscribe(
      (res:any)=>{
        this.visits=res;
        this.translationData=res.typesVisitTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  ssn;
  getSsnTypesById(id){
    this._ssnTypesService.getssnTypesById(id).subscribe(
      (res:any)=>{
        this.ssn=res;
        this.translationData=res.ssntypesTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  workperiods;
  getworkperiodsById(id){
    this.peridService.getWorkingPeriodsById(id).subscribe(
      (res:any)=>{
        this.ssn=res;
        this.translationData=res.workingPeriodTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  nationals;
  getnationalById(id){
    this._nationalservice.getnationalityById(id).subscribe(
      (res:any)=>{
        this.nationals=res;
        this.translationData=res.nationalitiesTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  priceCat;
  getpriceById(id){
    this._priceService.getPriceCategoryById(id).subscribe(
      (res:any)=>{
        this.priceCat=res;
        this.translationData=res.priceCategoryTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }
  workweek;
  getWorkWeek(id){
    this._workWeekService.getWorkWeekTranslation(id).subscribe(
      (res:any)=>{
        this.workweek=res;
        this.translationData=res;
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
    const languages = this.formTrans.get('translations') as FormArray
    if (languages.length > 1) {
      languages.removeAt(i)
      this.removeTranslation(id)

    } else {
      languages.reset()
    }
  }
  removeTranslation(id:number){
    if(this.data.type === "roomType"){
      this.delRoomTypegById(id)
    }else if(this.data.type === "visitType"){
      this.delVisitTypeById(id)
    }else if(this.data.type === "ssnType"){
      this.delSsnById(id)
    }else if(this.data.type === "workperiods"){
      this.delPeriodById(id)
    }else if(this.data.type === "national"){
      this.delNationalById(id)
    }else if(this.data.type === "pricecat"){
      this.delPriceById(id)
    }
}
delRoomTypegById(id){
  this._roomTypesService.deleteTrans(id).subscribe(
    (res:any)=>{
      if(res.success){
        this.snackbar.open("تم حذف النوع بنجاح ", "ُsuccess", {
          duration: 5000,
          panelClass: 'success'
        });

      }
    }
  )
}
delVisitTypeById(id){
  this._visitTypesService.deletevisitTrans(id).subscribe(
    (res:any)=>{
      if(res.success){
        this.snackbar.open("تم حذف النوع بنجاح ", "ُsuccess", {
          duration: 5000,
          panelClass: 'success'
        });

      }
    }
  )
}
delSsnById(id){
  this._ssnTypesService.deletessnTrans(id).subscribe(
    (res:any)=>{
      if(res.success){
        this.snackbar.open("تم حذف فترة العمل بنجاح ", "ُsuccess", {
          duration: 5000,
          panelClass: 'success'
        });

      }
    }
  )
}
delPeriodById(id){
  this.peridService.deleteperiodTrans(id).subscribe(
    (res:any)=>{
      if(res.success){
        this.snackbar.open("تم حذف فترة العمل بنجاح ", "ُsuccess", {
          duration: 5000,
          panelClass: 'success'
        });

      }
    }
  )
}
delNationalById(id){
  this._nationalservice.deleteNationalTrans(id).subscribe(
    (res:any)=>{
      if(res.success){
        this.snackbar.open("تم حذف الجنسية بنجاح ", "ُsuccess", {
          duration: 5000,
          panelClass: 'success'
        });

      }
    }
  )
}
delPriceById(id){
  this._priceService.deletePriceCategoryTrans(id).subscribe(
    (res:any)=>{
      if(res.success){
        this.snackbar.open("تم حذف الفئة بنجاح ", "ُsuccess", {
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
      'RoomTypeId':new FormControl(this.data.id),
      'id':new FormControl(data?.id? data?.id :null),
      'LangCode': new FormControl(data?.langCode ? data?.langCode :null, Validators.required),
      'Name': new FormControl(data?.name ? data?.name :null),


    })
  }
  closeDialog() {
    this.dialogRef.close(this.formTrans.value);
  }
  formData(obj) {
    console.log(obj)
    obj.translations =
    obj?.translations.map((el) => {
      return this.__helper.deleteNullValues(el);
    });
    let body = new FormData();
    let bodyObj = {}
    const formVal = obj;
    Object.keys(formVal).forEach((key) => {
      if (formVal[key]) {
        bodyObj[key] = formVal[key]
        if (key == "translations") {
          for (let i = 0; i < formVal['translations'].length; i++) {
            if(this.data.type === 'roomType'){
              body.append('translations['+(i)+'][RoomTypeId]', this.data.id);
              body.append('translations['+(i)+'][Id]', formVal.translations[i].id ? formVal.translations[i].id : 0);
            body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
            body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);

            }else if(this.data.type === 'visitType'){
              body.append('translations['+(i)+'][TypeVisitId]', this.data.id);
              body.append('translations['+(i)+'][Id]', formVal.translations[i].id ? formVal.translations[i].id : 0);
            body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
            body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);

            }else if(this.data.type === 'ssnType'){
              body.append('translations['+(i)+'][ssntypeId]', this.data.id);
              body.append('translations['+(i)+'][Id]', formVal.translations[i].id ? formVal.translations[i].id : 0);
            body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
            body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);

            }else if(this.data.type === 'workperiods'){
              body.append('translations['+(i)+'][WorkingPeriodId]', this.data.id);
              body.append('translations['+(i)+'][Id]', formVal.translations[i].id ? formVal.translations[i].id : 0);
              body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
              body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);

            }else if(this.data.type === 'national'){
              body.append('translations['+(i)+'][NationalityId]', this.data.id);
              body.append('translations['+(i)+'][Id]', formVal.translations[i].id ? formVal.translations[i].id : 0);
              body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
              body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);

            }else if(this.data.type === 'pricecat'){
              body.append('translations['+(i)+'][PriceCategoryId]', this.data.id);
              body.append('translations['+(i)+'][Id]', formVal.translations[i].id ? formVal.translations[i].id : 0);
              body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
              body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);

            }else if(this.data.type === 'workweek'){
              body.append('translations['+(i)+'][PriceCategoryId]', this.data.id);
              body.append('translations['+(i)+'][Id]', formVal.translations[i].id ? formVal.translations[i].id : 0);
              body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
              body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);

            }

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
    console.log(this.formTrans.value)
    this.dataSend=this.formData(this.formTrans.value)
    if(this.data.type === 'roomType'){
      console.log(this.dataSend)
      this._roomTypesService.roomTypesTranslation(this.dataSend).subscribe(
        (res)=>{
          this.closeDialog()
        }
      )
    }else if(this.data.type === 'visitType'){
      console.log(this.dataSend)
      this._visitTypesService.visitTypesTranslation(this.dataSend).subscribe(
        (res)=>{
          this.closeDialog()
        }
      )
    }else if(this.data.type === 'ssnType'){
      console.log(this.dataSend)
      this._ssnTypesService.ssnTypesTranslation(this.dataSend).subscribe(
        (res)=>{
          this.closeDialog()
        }
      )
    }else if(this.data.type === 'workperiods'){
      console.log(this.dataSend)
      this.peridService.WorkingPeriodsTranslation(this.dataSend).subscribe(
        (res)=>{
          this.closeDialog()
        }
      )
    }else if(this.data.type === 'national'){
      console.log(this.dataSend)
      this._nationalservice.natioalityTranslation(this.dataSend).subscribe(
        (res)=>{
          this.closeDialog()
        }
      )
    }else if(this.data.type === 'pricecat'){
      console.log(this.dataSend)
      this._priceService.priceCategoryTranslation(this.dataSend).subscribe(
        (res)=>{
          this.closeDialog()
        }
      )
    }

  }
}
