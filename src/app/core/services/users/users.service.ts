import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {firebaseApp} from "../../firebase";
import {fromPromise} from "rxjs/internal-compatibility";
import {map} from "rxjs/operators";
import {Session} from "../../model/session";

@Injectable()
export class UsersService {
  constructor() {
  }

  getUserFromCode(userCode: string): Observable<User> {
    const doc = firebaseApp.firestore().collection('users').doc(userCode);
    return fromPromise(doc.get()).pipe(
      map(snapshot => snapshot.data() as User)
    )
  }

  observeUsers(): Observable<User[]> {
    const doc = firebaseApp.firestore().collection('users');
    return new Observable<User[]>(observer => {
      doc.onSnapshot(docSnapshot => {
        if (!docSnapshot.empty && docSnapshot.docs.length) {
          observer.next(docSnapshot.docs.map(doc => doc.data() as User))
        } else {
          observer.error("Users collection does not exist!")
        }
      }, err => {
        observer.error(err)
      });
    })
  }
}
