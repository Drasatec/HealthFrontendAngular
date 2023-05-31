import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AddDoctorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("")
  }


}
