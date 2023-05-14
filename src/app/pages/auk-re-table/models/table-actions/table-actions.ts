export interface TableActions {
  actionType: TableActionsTypes | any;
  payload: any;
}

export enum TableActionsTypes {
  manage = "manage",
  redeem = "redeem",
  edit = "edit",
  delete = "delete",
  station = "station",
  student_route = "student-route",
  view = "view",
  bulkAction = "bulkAction",
  columnAction = "columnAction",
  archive = "archive",
  attendance_lable = "attendance_lable",
  restoreEmployee = "restoreEmployee",
  "set-as-leaver" = "set-as-leaver",
}
