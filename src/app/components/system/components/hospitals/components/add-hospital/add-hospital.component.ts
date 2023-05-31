import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
export interface DialogDataModel {
  localisedEntities: {
    code: string;
    title: string;
    value: string;
    canEdit?: boolean;
  }[];
}
@Component({
  selector: 'ngx-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {
  form: FormGroup;
  public codes = ['Ar', 'En', 'Fr'];
  public validationMsgs = {
    'emailAddress': [{ type: 'email', message: 'Enter a valid email' }]
  }
  // standardName: 'Chicken Curry';
  // data={
  //   localisedEntities: [
  //     {
  //       code: 'en',
  //       title: 'English',
  //       value: '',
  //       address:'',
  //       canEdit: false
  //     },
  //     {
  //       code: 'fr',
  //       title: 'French',
  //       value: null,
  //       address:'',
  //       canEdit: false
  //     },
  //     {
  //       code: 'ar',
  //       title: 'Arabic',
  //       address:'',
  //       value: null,
  //       canEdit: false
  //     },
  //   ],
  // }
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    // public dialogRef: MatDialogRef<AddHospitalComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogDataModel
  ) {
  //   this.dialogData = this.data
  //   this.rows = this.dialogData.localisedEntities.filter((lang) => lang.value == '');
  //   this.languages = this.dialogData.localisedEntities.map((item) => ({
  //     code: item.code,
  //     title: item.title,
  //     canEdit: item.canEdit,
  //   }));
  //   console.log(this.rows,this.languages)
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      codeNumber: [null],
      title: [null,Validators.required],
      address: [null],
      email:[],
      mobile:[],
      whatsapp:[],
      languages: this._FormBuilder.array([this.createEmailFormGroup()])


    });
  }
  get formControls() {
    return this.form.controls;
  }
  public addEmailFormGroup() {
    const emails = this.form.get('languages') as FormArray
    emails.push(this.createEmailFormGroup())
  }

  public removeOrClearEmail(i: number) {
    const languages = this.form.get('languages') as FormArray
    if (languages.length > 1) {
      languages.removeAt(i)
    } else {
      languages.reset()
    }
  }

  private createEmailFormGroup(): FormGroup {
    return new FormGroup({
      'code': new FormControl('', Validators.required),
      'name': new FormControl(''),
      'address': new FormControl(''),

    })
  }
  save(){}
  cancel(){
    this.form.reset()
  }

  /** attachment */
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }



  // dialogData: DialogDataModel;

  // languages: any[];

  // rows: any[];

  // item!: any[];

  // addNewLanguage() {
  //   this.rows.push({
  //     code: null,
  //     title: null,
  //     value: null,
  //     address:null,
  //     canEdit: true,
  //   });
  // }

  // onChangeValue(ev: any) {
  //   this.rows = this.rows.map((row) => {
  //     if (row.code == ev.value) {
  //       const lang = this.languages.find((lang) => lang.code == ev.value);
  //       row.title = lang.title;
  //     }
  //     return row;
  //   });
  //   //console.log(this.rows);

  //   this.languages = this.languages.map((lang) => {
  //     if (lang.code == ev.value) {
  //       lang.canEdit = false;
  //     }
  //     return lang;
  //   });

  //   //console.log(this.languages)
  // }

  // isDisabled() {
  //   return this.rows.filter((item) => item.value == '' || item.code == '')
  //     .length > 0
  //     ? true
  //     : false;
  // }

  // removeBtn(index: any) {
  //   console.log(this.rows);
  //   this.rows.splice(index, 1);
  // }

  // submit(ev: any) {
  //   // this.dialogRef.close({ data: this.rows });
  //   console.log(this.rows);
  // }

  // back() {
  //   // this.dialogRef.close();
  // }
}
