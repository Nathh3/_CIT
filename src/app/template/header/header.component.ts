import { Component } from '@angular/core';
import { UtiltyService } from '../../service/utilty.service';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentClient: Cliente | undefined ;

  constructor(private util: UtiltyService, private router: Router){
    if(util.isLoggedIn())
      this.currentClient = this.util.getCurrentClient();
    else
    this.router.navigate(["/login"]);
  }

}
