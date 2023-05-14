import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent implements OnInit {
  @Input() uid: any;
  @Input() dropdownData: any;
  @Input() row: any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChange: EventEmitter<any> = new EventEmitter(null);

  constructor() { }

  ngOnInit(): void {
    this.allowAction();
    // console.log(this.uid)
  }


  allowAction() {
    let dropdown = JSON.parse(JSON.stringify(this.dropdownData?.items));
    if (this.uid == 'future-candidates') {
      // enroll_status_id = 0 ---------- status ====> no enroll accept and student doesn't take any actions yet
      if (this.row?.enroll_status_id === 0 || this.row?.enroll_status_id === 1) {
        this.row['dropdownItemActions'] = dropdown?.filter(item =>
          item.key == 'decline-by-school' ||
          item.key == 'decline-by-parent' ||
          item.key == 'student-application' ||
          item.key == 'enroll-academic');
      }
      // enroll_status_id = 3 ---------- status ====> declined
      else if (this.row?.enroll_status_id == 2 || this.row?.enroll_status_id == 3) {
        this.row['dropdownItemActions'] = dropdown?.filter(item =>
          item.key == 'student-profile' ||
          item.key == 'enroll-bus' ||
          item.key == 'enroll-academic');
      }
      // enroll_status_id = 5 ---------- status ====> enrolled academic
      else if (this.row?.enroll_status_id == 5 || this.row?.enroll_status_id == 6) {
        this.row['dropdownItemActions'] = dropdown?.filter(item =>
          item.key == 'student-application' ||
          item.key == 'enroll-bus' ||
          item.key == 'academic-details' ||
          item.key == 'withdrawn');
      }
      // enroll_status_id = 4 ---------- status ====> withdrawn
      else if (this.row?.enroll_status_id == 4 || this.row?.enroll_status_id == 8 || this.row?.enroll_status_id == 9) {
        this.row["dropdownItemActions"] = dropdown?.filter(
          (item) =>
            item.key == "student-application" ||
            item.key == "withdrawn-details" ||
            item.key == "restore-withdrawn"
        );
      }
      // enroll_status_id = 7 -------------- status ====> fees_bus_enroll
      else if (this.row?.enroll_status_id == 7) {
        this.row["dropdownItemActions"] = dropdown?.filter(
          (item) =>
            item.key == "student-profile" ||
            item.key == "bus-details" ||
            item.key == "withdrawn" ||
            item.key == "academic-details"
        );
      }

    }else if(this.uid === "quiz_bank"){
      if (this.row?.is_publish == 0) {
        this.row["dropdownItemActions"] = dropdown?.filter(
          (item) =>
            item.key == "edit" ||
            item.key == "view" ||
            item.key == "publish" ||
            item.key == "Result" ||
            item.key == "delete"

        );
      }else if(this.row?.is_publish == 1){
        this.row["dropdownItemActions"] = dropdown?.filter(
          (item) =>
            item.key == "edit" ||
            item.key == "view" ||
            item.key == "Result" ||
            item.key == "delete"

        );
      }
    }
     else {
      this.row['dropdownItemActions'] = dropdown;
    }

  }


}
