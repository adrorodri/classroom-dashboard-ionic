import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/services/auth/auth.service";
import {AlertController} from "@ionic/angular";
import {BasePage} from "../base/base.page";
import {NavService} from "../core/services/nav/nav.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage implements OnInit {

  constructor(private authService: AuthService,
              private navService: NavService,
              public alertCtrl: AlertController) {
    super(alertCtrl);
  }

  ngOnInit() {
    this.authService.listenAuth().subscribe(authenticaded => {
      if (authenticaded) {
        this.navService.goToPage('home')
      }
    })
  }

  login() {
    this.authService.login().subscribe(() => {
    }, error => {
      this.showOkAlert("Login error", error.message)
    })
  }
}
