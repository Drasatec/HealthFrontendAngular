import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
// import { PaginatorState } from "src/app/_metronic/shared/crud-table";
import {
  TableActions,
  TableActionsTypes,
} from "./models/table-actions/table-actions";
import { SelectionModel } from "@angular/cdk/collections";
import { NgbDropdownConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { PaginatorState } from "../shared/crud-table";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "auk-re-table",
  templateUrl: "./auk-re-table.component.html",
  styleUrls: ["./auk-re-table.component.scss"],
})
export class AukReTableComponent implements OnInit, AfterContentChecked {
  // Begin paginator properties _____
  @Input() isLoading;
  @Input() grade_book_assessment_id;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onPaginateChange: EventEmitter<any> = new EventEmitter(null);
  resultOfCustomCheckBox = [];
  resultOfGradeInput = [];

  @Input() set paginatorState(state: PaginatorState) {
    if (state) {
      this.paginator = state;
    }
  }
  paginator: PaginatorState;

  // Begin filter Columns properties _____
  showsColumns = [];

  // Begin table properties _____
  columnsData: any[] = [];
  rowsData: any[];
  comboboxData: any;
  @Input() uid: any;
  @Input() set columns(data: any[]) {
    if (data.length > 0) {
      // this.columnsData = data;
      this.prepareColumnsData(data);
      this.showsColumns = this.columnsData.map((el) => el);
      this.checkSelectedTableColumns();
    }
  }
  @Input() submittedGrade:any;
  @Input() student_grade:any;
  @Input() set rows(data: any[]) {
    if (data) {
      this.rowsData = data;
    }
  }
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onAction: EventEmitter<any> = new EventEmitter(null);
  @Output() searchChange: EventEmitter<any> = new EventEmitter(null);
  @Input() actions: any[] = [];
  @Input() actionsData: any;
  @Input() showPaginator: boolean = true;
  @Input() externalSorting: boolean = false;
  @Output() sort: EventEmitter<TableActions> = new EventEmitter(null);

  // Templates of tables
  @ViewChild("tag", { static: true }) tagTempRef: TemplateRef<any>;
  @ViewChild("combobox", { static: true }) comboboxTempRef: TemplateRef<any>;
  @ViewChild("rowTitle", { static: true }) rowTitleTempRef: TemplateRef<any>;
  @ViewChild("humanCard", { static: true }) humanCardTempRef: TemplateRef<any>;
  @ViewChild("shortNumber", { static: true })
  shortNumberTempRef: TemplateRef<any>;
  @ViewChild("dropdownTempRef", { static: true })
  dropdownTempRef: TemplateRef<any>;
  @ViewChild("actionsTempRef", { static: true })
  actionsTempRef: TemplateRef<any>;
  @ViewChild("bulkActionTem", { static: true })
  bulkActionTempRef: TemplateRef<any>;
  @ViewChild("featureImage", { static: true })
  featureImageTempRef: TemplateRef<any>;
  @ViewChild("printedTempRef", { static: true })
  printedTempRef: TemplateRef<any>;
  @ViewChild("medicalTempRef", { static: true })
  medicalTempRef: TemplateRef<any>;
  @ViewChild("medicalHeaderRef", { static: true })
  medicalHeaderRef: TemplateRef<any>;
  @ViewChild("custodyTempRef", { static: true })
  custodyTempRef: TemplateRef<any>;
  @ViewChild("currentstuentTempRef", { static: true })
  currentstuentTempRef: TemplateRef<any>;
  @ViewChild("deleteTempRef", { static: true }) deleteTempRef: TemplateRef<any>;
  @ViewChild("popOverTempRef", { static: true })
  popOverTempRef: TemplateRef<any>;
  @ViewChild("attendanceActionsRef", { static: true })
  attendanceActionsRef: TemplateRef<any>;
  @ViewChild("dependanceActionsRef", { static: true })
  dependanceActionsRef: TemplateRef<any>;
  @ViewChild("dependantDataRef", { static: true })
  dependantDataRef: TemplateRef<any>;
  @ViewChild("dependantHeaderRef", { static: true })
  dependantHeaderRef: TemplateRef<any>;
  @ViewChild("spouseDataRef", { static: true }) spouseDataRef: TemplateRef<any>;
  @ViewChild("spouseHeaderRef", { static: true })
  spouseHeaderRef: TemplateRef<any>;
  @ViewChild("relativeDataRef", { static: true })
  relativeDataRef: TemplateRef<any>;
  @ViewChild("relativeHeaderRef", { static: true })
  relativeHeaderRef: TemplateRef<any>;
  @ViewChild("familyDataRef", { static: true }) familyDataRef: TemplateRef<any>;
  @ViewChild("familyHeaderRef", { static: true })
  familyHeaderRef: TemplateRef<any>;
  @ViewChild("educationDataRef", { static: true })
  educationDataRef: TemplateRef<any>;
  @ViewChild("educationHeaderRef", { static: true })
  educationHeaderRef: TemplateRef<any>;
  @ViewChild("bulkActionHeaderTem", { static: true })
  bulkActionHeaderTempRef: TemplateRef<any>;
  @ViewChild("columCellTemplate", { static: true })
  columCellTemplate: TemplateRef<any>;
  @ViewChild("badgeWithAction", { static: true })
  badgeWithActionRef: TemplateRef<any>;
  @ViewChild("SiblingsHeaderRef", { static: true })
  SiblingsHeaderRef: TemplateRef<any>;
  @ViewChild("SiblingsDataRef", { static: true })
  SiblingsDataRef: TemplateRef<any>;
  @ViewChild("messageStatusRef", { static: true })
  messageStatusRef: TemplateRef<any>;
  @ViewChild("periods", { static: true }) periodsTempRef: TemplateRef<any>;
  @ViewChild("week", { static: true }) weekTempRef: TemplateRef<any>;
  @ViewChild("lableTitle", { static: true })
  lableTitleTempRef: TemplateRef<any>;
  @ViewChild("attendanceLable", { static: true })
  attendanceLableTempRef: TemplateRef<any>;
  @ViewChild("attendanceLableclass", { static: true })
  attendanceLableclassTempRef: TemplateRef<any>;




  @ViewChild("is_missed", { static: true }) is_missed: TemplateRef<any>;
  @ViewChild("attachement", { static: true }) attachement: TemplateRef<any>;
  @ViewChild("file", { static: true }) file: TemplateRef<any>;

  @ViewChild("nationality", { static: true }) nationality: TemplateRef<any>;

  @ViewChild("customCheckBox", { static: true })
  customCheckBox: TemplateRef<any>;
  @ViewChild("customCheckBoxHeaderTem", { static: true })
  customCheckBoxHeaderTem: TemplateRef<any>;
  @ViewChild("max_score", { static: true })
  max_score: TemplateRef<any>;
  @ViewChild("gradeInput", { static: true })
  gradeInput: TemplateRef<any>;
  // Begin bulk Action properties
  selection = new SelectionModel<any>(true, []);
  selection2 = new SelectionModel<any>(true, []);
  selection3 = new SelectionModel<any>(true, []);
  payloadForParentEmail = [];

  scrollBarHorizontal: boolean = false;
  relations = {};
  private subscriptions: Subscription = new Subscription();

  constructor(
    config: NgbDropdownConfig,
    private _MatDialog: MatDialog,
    // private _listService: ListsService
  ) {
    config.autoClose = "outside";
    // this.getRelationsList();
  }

  ngOnInit(): void {
    this.scrollBarHorizontal = window.innerWidth < 1300;
  }
  submittedGradeStyle
  ngAfterContentChecked() {
    //
    this.submittedGradeStyle=this.submittedGrade
    // console.log(this.student_grade)
  }

  // getRelationsList() {
  //   this.subscriptions.add(
  //     this._listService.getRelationTypes().subscribe((res) => {
  //       this.relations = res.items;
  //     })
  //   );
  // }

  // Begin table functions ___
  prepareColumnsData(data: any[]): void {
    this.resultOfCustomCheckBox = [];
    this.resultOfGradeInput = [];

    data.forEach((element) => {
      switch (element?.cellTemplateName) {
        case "Actions":
          element.cellTemplate = this.actionsTempRef;
          break;

        case "Bulk Action":
          element.headerTemplate = this.bulkActionHeaderTempRef;
          element.cellTemplate = this.bulkActionTempRef;
          break;

        case "Feature Image":
          element.cellTemplate = this.featureImageTempRef;
          break;

        case "Combobox":
          element.cellTemplate = this.comboboxTempRef;
          this.comboboxData = element.comboboxData;
          break;
        case "customCheckBox":
          element.headerTemplate = this.customCheckBoxHeaderTem; //for header
          element.cellTemplate = this.customCheckBox; //for body
          element.cellTemplateName === "customCheckBox"
            ? this.resultOfCustomCheckBox.push(element)
            : null;
          break;
        case "gradeInput":
          element.headerTemplate = this.max_score; //for header

          element.cellTemplate = this.gradeInput; //for body
          element.cellTemplateName === "gradeInput"
            ? this.resultOfGradeInput.push(element)
            : null;
          break;
        case "Human Card":
          element.cellTemplate = this.humanCardTempRef;
          break;

        case "Tag":
          element.cellTemplate = this.tagTempRef;
          break;

        case "Long Title":
          element.cellTemplate = this.rowTitleTempRef;
          break;

        case "Short Number":
          element.cellTemplate = this.shortNumberTempRef;
          break;

        case "Dropdown":
          element.cellTemplate = this.dropdownTempRef;
          break;

        case "printed":
          element.cellTemplate = this.printedTempRef;
          break;

        case "medical":
          element.cellTemplate = this.medicalTempRef;
          element.headerTemplate = this.medicalHeaderRef;

          break;

        case "custody":
          element.cellTemplate = this.custodyTempRef;
          break;
        case "active":
          element.cellTemplate = this.currentstuentTempRef;
          break;
        case "delete":
          element.cellTemplate = this.deleteTempRef;
          break;
        case "messageStatus":
          element.cellTemplate = this.messageStatusRef;
          break;
        case "popOver":
          element.cellTemplate = this.popOverTempRef;
          break;

        case "Attendance Actions":
          element.cellTemplate = this.attendanceActionsRef;
          break;

        case "Dependance Actions":
          element.cellTemplate = this.dependantDataRef;
          element.headerTemplate = this.dependantHeaderRef;
          break;

        case "Spouse Actions":
          element.cellTemplate = this.spouseDataRef;
          element.headerTemplate = this.spouseHeaderRef;
          break;
        case "Siblings":
          element.cellTemplate = this.SiblingsDataRef;
          element.headerTemplate = this.SiblingsHeaderRef;
          break;
        case "Relative Actions":
          element.cellTemplate = this.relativeDataRef;
          element.headerTemplate = this.relativeHeaderRef;
          break;

        case "Family Actions":
          element.cellTemplate = this.familyDataRef;
          element.headerTemplate = this.familyHeaderRef;
          break;

        case "Badge Action":
          element.cellTemplate = this.badgeWithActionRef;
          break;

        case "Education Actions":
          element.cellTemplate = this.educationDataRef;
          element.headerTemplate = this.educationHeaderRef;
          break;
        case "Lable Title":
          element.cellTemplate = this.lableTitleTempRef;
          break;
        case "attendanceLable":
          element.cellTemplate = this.attendanceLableTempRef;
          break;
        case "attendanceLableclass":
          element.cellTemplate = this.attendanceLableclassTempRef;
          break;

        case "Week":
          element.cellTemplate = this.weekTempRef;
          break;
        case "periods":
          // element.headerTemplate = this.periodsTempRef; //for header
          element.cellTemplate = this.periodsTempRef;
          break;
        case "nationality":
          element.cellTemplate = this.nationality;
          break;
        case "attachment":
          element.cellTemplate = this.attachement;
          break;
        case "is_missed":
          element.cellTemplate = this.is_missed;
          break;
        case "file":
          element.cellTemplate = this.file;
        default:
          break;
      }
    });

    data.forEach((el) => {
      if (el?.cellTemplateName != "Bulk Action" && el?.showSearch) {
        el.headerTemplate = this.columCellTemplate;
      }
    });

    this.columnsData = data.sort((a, b) => {
      return a.order - b.order;
    });
  }

  specialRow(row) {
    if (row.admission_status === "accepted") {
      return { accepted: true };
    } else if (row.admission_status === "rejected") {
      return { rejected: true };
    }
  }
  onCompoboxChange(event): void {
    let data: TableActions = {
      actionType: this.comboboxData.key,
      payload: {
        ...event,
      },
    };
    this.onAction.emit(data);
  }

  search(e, type) {
    this.searchChange.emit({
      type,
      event: e,
    });
  }

  checkSelectedTableColumns() {
    const selectedColumns = JSON.parse(
      localStorage.getItem(`${this.uid}SelectedColumns`)
    );
    if (selectedColumns) {
      this.showsColumns = this.showsColumns.map((col) => {
        if (!selectedColumns.includes(col.name)) {
          col.show = false;
        }
        return col;
      });
      this.columnsData = this.columnsData.filter((col) =>
        selectedColumns.includes(col.name)
      );
    }
  }

  updateColumns(column, index) {
    if (column.show) {
      if (index == this.columnsData.length) {
        this.columnsData
          .splice(this.columnsData.length - 2, 0, column)
          .splice(index, 0, column);

        this.columnsData.sort((a, b) => {
          return a.order - b.order;
        });

        this.columnsData = [...this.columnsData];
      } else {
        this.columnsData.splice(index, 0, column);
        this.columnsData.sort((a, b) => {
          return a.order - b.order;
        });
        this.columnsData = [...this.columnsData];
      }
    } else {
      this.columnsData = this.columnsData.filter((e) => e.name != column.name);
      this.columnsData.sort((a, b) => {
        return a.order - b.order;
      });
    }
    localStorage.setItem(
      `${this.uid}SelectedColumns`,
      JSON.stringify(
        this.showsColumns.filter((el) => el.show).map((e) => e.name)
      )
    );
  }

  // Begin bulk Action Functions
  onSelectionChange() {
    let payload = this.selection.selected;
    this.selection2.clear();
    this.selection3.clear();
    this.onAction.emit({
      action: { key: TableActionsTypes.bulkAction },
      payload,
    });
  }
  //youssef
  onSelectionChangeInColumns(row?, column?, event?) {
    // debugger;
    this.selection.clear();
    if (event) {
      column?.name === "Father Name"
        ? this.selection2.toggle(row)
        : this.selection3.toggle(row);
    }

    let emailIndex;
    let payloadOfFather = this.selection2.selected;
    let payloadOfMother = this.selection3.selected;

    payloadOfFather = this.selection2.selected.map((item) => {
      return { email: item?.father_email, id: item.father_id };
    });
    payloadOfMother = this.selection3.selected.map((item) => {
      return { email: item?.mother_email, id: item.mother_id };
    });
    this.onAction.emit({
      action: { key: TableActionsTypes.columnAction },
      payload: [...payloadOfFather, ...payloadOfMother],
    });
  }

  checkboxLabelOnSelectionChangeInColumns(row?: any, column?): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    if (column?.name === "Father Name") {
      return `${this.selection2.isSelected(row) ? "deselect" : "select"} row ${
        row.position + 1
      }`;
    } else {
      return `${this.selection3.isSelected(row) ? "deselect" : "select"} row ${
        row.position + 1
      }`;
    }
  }
  isAllParentSelected(column?) {
    column?.name === "Father Name"
      ? this.selection2.selected
      : this.selection3.selected;
    const numSelected =
      column?.name === "Father Name"
        ? this.selection2.selected.length
        : this.selection3.selected.length;
    const numRows = this.rowsData?.length;
    return numSelected === numRows;
  }
  masterToggleforColumn(column?) {
    if (this.isAllParentSelected(column)) {
      column?.name === "Father Name"
        ? this.selection2.clear()
        : this.selection3.clear();
      return;
    }
    if (column?.name === "Father Name") {
      this.selection3.clear();
      this.selection2.select(...this.rowsData);
    } else {
      this.selection2.clear();
      this.selection3.select(...this.rowsData);
    }
  }
  //end youssef
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.rowsData);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.rowsData?.length;
    return numSelected === numRows;
  }

  attendanceSetues(attendance?: any, row?) {
    console.log("early",row)
    let attendanceType: String = "";
    let attendance_id = "";
    if (
      (row?.student_status === "Present" && attendance === row?.student_status) ||
      (row?.student_status === "Late" && attendance === row?.student_status)
    ) {
      attendanceType = "del";
      // attendance_id = row?.att_id;
    } else {
      attendanceType = attendance;
    }
    this.onAction.emit({
      action: { key: TableActionsTypes.attendance_lable },
      payload: {
        attendancestatus: attendanceType,
        student_id: row?.id,
        full_name: row?.full_name,
        // attendance_id: attendance_id,
      },
    });
  }

  attendanceSetuesClass(attendance?: any, row?) {
    let attendanceType: String = "";
    let attendance_id = "";
    if (
      (row?.student_status === "Present" && attendance === row?.student_status) ||
      (row?.student_status === "Late" && attendance === row?.student_status)
      ||(row?.student_status === "Absent" && attendance === row?.student_status) ||
      (row?.student_status === "left_early" && attendance === row?.student_status)
    ) {
      attendanceType = "del";
      // attendance_id = row?.att_id;
    } else {
      attendanceType = attendance;
    }
    this.onAction.emit({
      action: { key: TableActionsTypes.attendance_lable },
      payload: {
        attendancestatus: attendanceType,
        student_id: row?.id,
        full_name: row?.full_name,
        // attendance_id: attendance_id,
      },
    });
  }

  openBulkActionDialog(): void {
    const DialogRef = this._MatDialog.open(null, {
      width: "600px",
      panelClass: ["custom-dialog", "bulk-action-dialog"],
      data: {
        selectedRow: this.selection.selected,
      },
    });
  }

  // onInputChange(type){
  //   this.searchChange.emit({
  //     type,
  //     event : e
  //   });
  // }

  // End bulk Action Functions
  gradeData;
  sendTheNewValue(row,e:any){
    console.log(this.grade_book_assessment_id)
    this.onAction.emit({
      action: { key: TableActionsTypes.columnAction },
      payload: {
        student_grade_id: row.student_grade_id,
        grade: e,
        grade_book_assessment_id:this.grade_book_assessment_id
      },
    });
  }
}
