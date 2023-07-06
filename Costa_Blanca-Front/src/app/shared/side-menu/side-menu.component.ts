import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent extends AppComponent implements OnInit {

  @Input() isExpanded: Boolean = false;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
  }
}
