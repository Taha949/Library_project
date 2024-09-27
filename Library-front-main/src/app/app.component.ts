import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    SidebarComponent,
    RouterModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class AppComponent {
  title = 'library-front';
}
