import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {firebaseApp} from "../../firebase";
import firebase from "firebase";
import UserCredential = firebase.auth.UserCredential;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable()
export class AuthService {
  login(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return fromPromise(firebaseApp.auth().signInWithPopup(provider));
  }

  listenAuth(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          observer.next(true)
        } else {
          observer.next(false)
        }
      });
    })
  }
}
