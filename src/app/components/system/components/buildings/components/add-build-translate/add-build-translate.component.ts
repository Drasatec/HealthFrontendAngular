import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { BuildingService } from '../../services/building.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { AddInfoTranslateComponent } from '../../../hospitals/components/add-info-translate/add-info-translate.component';

@Component({
  selector: 'ngx-add-build-translate',
  templateUrl: './add-build-translate.component.html',
  styleUrls: ['./add-build-translate.component.scss']
})
export class AddBuildTranslateComponent implements OnInit {
  formTrans:FormGroup;
  public codes = [{name:'Ar',value:'ar'}, {name:'En',value:'en'}, {name:'Fr',value:'fr'}];

  @Output() onAddTranslate: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddInfoTranslateComponent>,
    private _FormBuilder:FormBuilder,
    private _buildingService:BuildingService,
    private __helper:HelperService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  translationData;
  ngOnInit(): void {
    this.createForm()
    console.log(this.data)
    this.getHospitalById(this.data)
  }
  get formControls() {
    return this.formTrans.controls;
  }
  hospital;
  getHospitalById(id){
    this._buildingService.getBuildingsById(id).subscribe(
      (res:any)=>{
        this.hospital=res;
        this.translationData=res.buildingTranslation;
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

  public removeOrClearEmail(i: number) {
    const languages = this.formTrans.get('translations') as FormArray
    if (languages.length > 1) {
      languages.removeAt(i)
    } else {
      languages.reset()
    }
  }

  private createEmailFormGroup(data?): FormGroup {
    console.log(data)
    return this._FormBuilder.group({
      'buildingId':new FormControl(this.data),
      'id':new FormControl(data?.id? data?.id :null),
      'LangCode': new FormControl(data?.langCode ? data?.langCode :null, Validators.required),
      'Name': new FormControl(data?.name ? data?.name :null),
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
            body.append('translations['+(i)+'][BuildeingId]', this.data);
            body.append('translations['+(i)+'][Id]', formVal.translations[i].id);
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
    this.dataSend=this.formData(this.formTrans.value)
    this._buildingService.addTranslation(this.data,this.dataSend).subscribe(
      (res)=>{
        this.closeDialog()
      }
    )
  }
}