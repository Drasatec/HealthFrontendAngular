import { Component, Inject, OnInit } from '@angular/core';
import { NationalityService } from '../../../services/nationality.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../@theme/services/lookup.service';

@Component({
  selector: 'ngx-add-natioality',
  templateUrl: './add-natioality.component.html',
  styleUrls: ['./add-natioality.component.scss']
})
export class AddNatioalityComponent implements OnInit {
  form: FormGroup;
  loading=false
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _nationalservice:NationalityService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddNatioalityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  id:number;
  building:any;
  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (param)=>{
    // console.log(param)

    //     this.id =param.id;
    //   }
    // )
    this.id=this.data? this.data.id :null
    this.createForm();
    if(this.id){
      this.getNationalById(this.id);
    }
  }
  nationals
  getNationalById(id){
    let paylod={
      lang:'ar'
    }
    this._nationalservice.getnationalityById(id,paylod).subscribe(
      (res:any)=>{
        this.nationals = res;
        this.patchForm();
      }
    )
  }
  patchForm(){
    this.form.patchValue({
     CallingCode:this.nationals.callingCode?this.nationals.callingCode:null,
      NumberOfDigits:this.nationals.numberOfDigits?this.nationals.numberOfDigits:null,
      CountryCode:this.nationals.countryCode?this.nationals.countryCode:null,
      CurrencyCode:this.nationals.currencyCode?this.nationals.currencyCode:null,
      CurrencySymbol:this.nationals.currencySymbol?this.nationals.currencySymbol:null,
      CountryName:this.nationals.countriesTranslations.length > 0?this.nationals.countriesTranslations[0].countryName:null,
      CurrencyName: this.nationals.countriesTranslations.length > 0?this.nationals.countriesTranslations[0].currencyName:null,
      CapitalName:this.nationals.countriesTranslations.length > 0?this.nationals.countriesTranslations[0].capitalName:null,
  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      CallingCode:[null,Validators.maxLength(5)],
      NumberOfDigits:[null],
      CountryCode:[null,[Validators.maxLength(2), this.englishLettersOnlyValidator()]],
      CurrencyCode:[null,[Validators.maxLength(3), this.englishLettersOnlyValidator()]],
      CurrencySymbol:[null,[Validators.maxLength(2), this.englishLettersOnlyValidator()]],
      CountryName:[null,Validators.required],
      CurrencyName: [null],
      CapitalName:[null],
      LangCode:[null],
    });
  }
   // Create a custom validator function
   englishLettersOnlyValidator() {
    return (control) => {
      const value = control.value;

      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return { englishLettersOnly: true };
      }

      return null; // Validation passes
    };
  }
  get formControls() {
    return this.form.controls;
  }
  translateData;
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._nationalservice.createnationality(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم الاضافة  بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeDialog()
          },
          (err) => {
            this.loading=false

            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }else{
        this._nationalservice.editnationality(this.sendData).subscribe(
          (res)=>{
            this.loading=false

            this.snackBar.open("تم التعديل  بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeEditDialog()
          },
          (err) => {
            this.loading=false

            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }

    }
  }

  closeDialog() {
    this.dialogRef.close({isAdd:true});
  }
  closeEditDialog() {
    this.dialogRef.close({isAdd:true});
  }
  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      id:this.id?this.id:null,
      ...data,
      CountriesTranslations:[{
        id:this.id ? this.nationals.countriesTranslations[0].id:0,
        CountryName:data.CountryName,
        CurrencyName:data.CurrencyName,
        CapitalName:data.CapitalName,
        LangCode:'ar',
      }],
    }
    this.sendData=this.formData(paylod)
  }
  formData(obj) {
    console.log(obj)

    let body = new FormData();
    let bodyObj = {}
    const formVal = obj;
    Object.keys(formVal).forEach((key) => {
      if (formVal[key]) {
        bodyObj[key] = formVal[key]
        if (key == "CountriesTranslations") {
          for (let i = 0; i < formVal['CountriesTranslations'].length; i++) {
            body.append('CountriesTranslations['+(i)+'][id]', formVal.CountriesTranslations[i].id );
            body.append('CountriesTranslations['+(i)+'][CountryName]', formVal.CountriesTranslations[i].CountryName);
            body.append('CountriesTranslations['+(i)+'][CurrencyName]', formVal.CountriesTranslations[i].CurrencyName);

            body.append('CountriesTranslations['+(i)+'][CapitalName]', formVal.CountriesTranslations[i].CapitalName);
            body.append('CountriesTranslations['+(i)+'][LangCode]', formVal.CountriesTranslations[i].LangCode);
          }
        }
        else if (key == "PhoneNumbers") {
          for (let i = 0; i < formVal['PhoneNumbers'].length; i++) {
            body.append('PhoneNumbers['+(i)+'][id]', formVal.PhoneNumbers[i].id);
            body.append('PhoneNumbers['+(i)+'][TelephoneNumber]', formVal.PhoneNumbers[i].TelephoneNumber);
          }
        }
        else {
          body.append(key, formVal[key]);
        }

      }
    });
    return body;
  }
  cancel(){
    this.form.reset()
  }

}
