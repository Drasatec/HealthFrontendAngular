import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() items
  constructor() { }

  ngOnInit(): void {
    console.log("")

  }

}