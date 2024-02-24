import { Component } from '@angular/core';
import { faPlus,faFile } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
plus=faPlus;
get=faFile;
}
