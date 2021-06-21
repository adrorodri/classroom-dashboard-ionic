import {AlertController} from "@ionic/angular";

export class BasePage {
  constructor(public alertCtrl: AlertController) {

  }

  async showOkAlert(header, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {text: "Ok"}
      ]
    });
    await alert.present();
  }
}
