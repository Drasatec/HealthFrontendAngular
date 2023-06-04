import { Component, OnInit, Output ,EventEmitter, Inject} from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HospitalService } from '../../services/hospital.service';

@Component({
  selector: 'ngx-add-info-translate',
  templateUrl: './add-info-translate.component.html',
  styleUrls: ['./add-info-translate.component.scss']
})
export class AddInfoTranslateComponent implements OnInit{
  formTrans:FormGroup;
  public codes = ['Ar', 'En', 'Fr'];

  @Output() onAddTranslate: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddInfoTranslateComponent>,
    private _FormBuilder:FormBuilder,private _hospitalService:HospitalService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  ngOnInit(): void {
    this.createForm()
    console.log(this.data)
  }
  get formControls() {
    return this.formTrans.controls;
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

  private createEmailFormGroup(): FormGroup {
    return this._FormBuilder.group({
      'hospitalId':new FormControl(this.data),
      'LangCode': new FormControl('', Validators.required),
      'Name': new FormControl(''),
      'Address': new FormControl(''),
      'desc': new FormControl(''),
    })
  }
  closeDialog() {
    this.dialogRef.close(this.formTrans.value);
  }
  formData(obj) {
    console.log(obj)

    let body = new FormData();
    let bodyObj = {}
    const formVal = obj;
    Object.keys(formVal).forEach((key) => {
      if (formVal[key]) {
        bodyObj[key] = formVal[key]
        if (key == "translations") {
          for (let i = 0; i < formVal['translations'].length; i++) {
            body.append('translations['+(i)+'][hospitalId]', this.data);
            body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
            body.append('translations['+(i)+'][Address]', formVal.translations[i].Address);
            body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);
            body.append('translations['+(i)+'][desc]', formVal.translations[i].desc);
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
    this._hospitalService.addTranslation(this.data,this.dataSend).subscribe(
      (res)=>{
        this.closeDialog()
      }
    )
  }
}
