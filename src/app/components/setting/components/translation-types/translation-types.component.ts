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
import { DoctorDegreeService } from '../../services/doctor-degree.service';
import { DoctorStatusService } from '../../services/doctor-status.service';
import { TranslationServiceService } from '../../services/translation-service.service';

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
    private _translationservice:TranslationServiceService,
    private __helper:HelperService,
    private snackbar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  translationData;
  dataRec;
  dataId;
  loading=false
  ngOnInit(): void {
    this.createForm()
    console.log(this.data)
    if(this.data.type === "roomType"){
      this._translationservice.sendController("RoomType")
      this.dataRec="roomTypeTranslations"
      this.dataId="RoomTypeId"
    }else if(this.data.type === "visitType"){
      this._translationservice.sendController("TypesVisit")
      this.dataRec="typesVisitTranslations"
      this.dataId="TypeVisitId"

    }else if(this.data.type === "ssnType"){
      this._translationservice.sendController("Ssntype")
      this.dataRec="ssntypesTranslations"
      this.dataId="ssntypeId"

    }else if(this.data.type === "workperiods"){
      this._translationservice.sendController("WorkingPeriod")
      this.dataId="WorkingPeriodId"
      this.dataRec="workingPeriodTranslations"

    }else if(this.data.type === "national"){
      this._translationservice.sendController("Nationality")
      this.dataRec="nationalitiesTranslations"
      this.dataId="NationalityId"

    }else if(this.data.type === "pricecat"){
      this._translationservice.sendController("PriceCategory")
      this.dataRec="priceCategoryTranslations"
      this.dataId="PriceCategoryId"

    }else if(this.data.type === "workweek"){
      this._translationservice.sendController("Weekday")
      this.dataRec="weekdayName"
      this.dataId="RoomTypeId"

    }else if(this.data.type === "degree"){
      this._translationservice.sendController("DoctorsDegree")
      this.dataRec="doctorsDegreesTranslations"
      this.dataId="DoctorDegreeId"

    }else if(this.data.type === "status"){
      this._translationservice.sendController("EmployeeStatus")
      this.dataRec="employeesStatusTranslations"
      this.dataId="EmployeeStatusId"

    }
    this.getById(this.data.id,this.dataRec)
  }
  get formControls() {
    return this.formTrans.controls;
  }
  getById(id,data){
    this._translationservice.getById(id).subscribe(
      (res:any)=>{
        this.translationData=res[data];
        this.translationData?.forEach(el => {
          if(this.data.type === 'degree') el.name =el.degreeName
          if(this.data.type === 'status') el.name = el.statusName

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
    this.delTranslation(id)
}
delTranslation(id){
  this._translationservice.deleteTranslation(id).subscribe(
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

  private createEmailFormGroup(data?): FormGroup {
    console.log(data)
    return this._FormBuilder.group({
      'RoomTypeId':new FormControl(this.data.id),
      'id':new FormControl(data?.id? data?.id :null),
      'LangCode': new FormControl(data?.langCode ? data?.langCode :null, Validators.required),
      'Name': new FormControl(data?.name ? data?.name :null, Validators.required),


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
            body.append('translations['+(i)+']['+this.dataId+']', this.data.id);
            body.append('translations['+(i)+'][Id]', formVal.translations[i].id ? formVal.translations[i].id : 0);
            body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
            body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);

            if(this.data.type === 'degree'){
              body.append('translations['+(i)+'][DegreeName]', formVal.translations[i].Name);
            }else if(this.data.type === 'status'){
              body.append('translations['+(i)+'][StatusName]', formVal.translations[i].Name);
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
    this.formTrans.markAllAsTouched();
    if (this.formTrans.valid) {
      this.loading=true
      this.dataSend=this.formData(this.formTrans.value)
      this._translationservice.editTranslation(this.dataSend).subscribe(
        (res)=>{
          this.closeDialog()
        },
        (err) => {
          this.loading=false
          this.snackbar.open("من فضلك حاول مرة اخري", "ُError", {
            duration: 3000,
            panelClass: 'error'
          });

        }
      )
    }

  }
}
