import {Injectable} from "@angular/core";
import {NavController} from "@ionic/angular";
import {Router, RouterOutlet} from "@angular/router";

@Injectable()
export class NavService {
  constructor(private ionRouter: NavController) {
  }

  goToPage(pageRoute: string) {
    this.ionRouter.navigateForward(pageRoute)
  }
}
