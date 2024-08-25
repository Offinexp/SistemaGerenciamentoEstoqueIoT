// index.component.ts
import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],

  styleUrls: ['./index.component.css']
})
export class IndexComponent {}
