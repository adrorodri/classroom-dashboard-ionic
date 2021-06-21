import {Injectable} from '@angular/core';
import {firebaseApp} from '../../firebase';
import {Observable} from "rxjs";
import {Session} from "../../model/session";

@Injectable()
export class SessionsService {
  observeSessionForDate(date: string): Observable<Session> {
    const doc = firebaseApp.firestore().collection('sessions').doc(date);
    return new Observable<Session>(observer => {
      doc.onSnapshot(docSnapshot => {
        if (docSnapshot.exists) {
          observer.next(docSnapshot.data() as Session)
        } else {
          observer.error("Session does not exist!")
        }
      }, err => {
        observer.error(err)
      });
    })
  }
}
