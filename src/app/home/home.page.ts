import { Component } from '@angular/core';
import {SessionsService} from '../core/services/sessions/sessions.service';
import {Session} from "../core/model/session";
import {DateUtils} from "../core/utils/DateUtils";
import {BasePage} from "../base/base.page";
import {AlertController} from "@ionic/angular";
import {User} from "../core/model/user";
import {UsersService} from "../core/services/users/users.service";
import {map} from "rxjs/operators";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage {

  public attendees: string[] = []
  public attendeesMissing: string[] = []
  public participations: string[] = []
  public session: Session = undefined;
  public users: User[] = [];

  public mobile: User[] = [];
  public online: User[] = [];
  public idle: User[] = [];
  public offline: User[] = [];

  constructor(private attendanceService: SessionsService,
              private usersService: UsersService,
              public alertCtrl: AlertController) {
    super(alertCtrl);
  }

  ngOnInit() {
    this.attendanceService.observeSessionForDate(DateUtils.getTodayString()).subscribe(
      session => {
        this.participations = session.participations;
        this.attendees = session.attendance;
      }
    )

    combineLatest([this.attendanceService.observeSessionForDate(DateUtils.getTodayString()),
      this.usersService.observeUsers()]).subscribe(([session, users]) => {
      this.session = session;
      this.users = users;
      this.updateAttendeesMissing();
    })

    this.usersService.observeUsers().pipe(
      map(users => users.map(user => {
        if(user.presence) {
          user.lastPresence = user.presence[user.presence.length - 1]
        }
        return user
      }))
    ).subscribe(
      users => {
        this.users = users
        this.online = this.users.filter(u => u.lastPresence && u.lastPresence.endsWith("Online"))
        this.mobile = this.users.filter(u => u.lastPresence && u.lastPresence.endsWith("Mobile"))
        this.idle = this.users.filter(u => u.lastPresence && u.lastPresence.endsWith("Idle"))
        this.offline = this.users.filter(u => u.lastPresence && u.lastPresence.endsWith("Offline"))
      }
    )
  }

  updateAttendeesMissing() {
    this.attendeesMissing = this.users.filter(u => !this.attendees.some(a => a === u.universityId)).map(u => u.discordId)
  }

  openSessionInfo(session: Session) {
    this.showOkAlert(session.date, session.name)
  }

  pickRandomUser() {
    const eligibleUsers = [...this.online, ...this.idle, ...this.mobile];
    const random = eligibleUsers[Math.round(Math.random() * eligibleUsers.length)]
    this.showOkAlert("Random User", random.name)
  }
}
