import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router} from "@angular/router";

import { Observable } from 'rxjs/Observable';
import { DatabaseService } from './database.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

let config = {
    apiKey: 'AIzaSyD5-GtfArEanLasYBxACCsKZCAwX_lQp3I',
    authDomain: 'atiempo-5533e.firebaseapp.com',
    databaseURL: 'https://atiempo-5533e.firebaseio.com',
    projectId: 'atiempo-5533e',
    storageBucket: 'atiempo-5533e.appspot.com',
    messagingSenderId: '212855483806'
}

var secondaryApp = firebase.initializeApp(config, "Fourth");
var commerce:string;

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth, private router: Router,  private db: AngularFireDatabase) {
    this.user = firebaseAuth.authState
  }

  signupCommerce(email: string, password: string){
    return secondaryApp.auth().createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          console.log('Nice, it worked!', value);

        })
        .catch(err => {
          console.log('Something went wrong:',err.message);
        });
  }

  logout() {
    this.firebaseAuth
        .auth
        .signOut();
    this.router.navigateByUrl('/session/login');

  }
  canContinue(){
      this.user.subscribe(auth => {
          if (!auth) {
              this.router.navigateByUrl('/pages/login');
          }
      });
  }
  getUser(){
    return this.user;
  }
  getGCMP(){
    const messaging = firebase.messaging();
    let uid;
    var that = this;
    this.getUser().subscribe(user =>{
          console.log(user.uid);
            uid = user.uid;

          if ('serviceWorker' in navigator) {

              navigator.serviceWorker.register('firebase-messaging-sw.js').then(function(registration) {
                messaging.requestPermission().then(()=>{
                    console.log("Hay permiso");
                    return messaging.getToken();
                }).then(tocken=>{
                    that.db.list('admin/gcmTocken').subscribe(tockens=>{
                      let exist;
                      console.log('ejecuto');
                      if(tockens.length == 0){
                        that.db.database.ref().child('admin').child('gcmTocken').push(tocken);
                        console.log('primera vez');
                      }else{
                      console.log(tockens);
                      console.log(tocken);
                      exist = false;
                      for (var i = 0; i < tockens.length; i++) {
                          console.log(tockens[i].$value == tocken)
                          if (tockens[i].$value == tocken) {
                              exist =  true;
                              break;
                          }
                      }
                      
                      if(exist){
                        console.log('existe');
                      }else{
                        console.log('entra2');
                        that.db.database.ref().child('admin').child('gcmTocken').push(tocken);
                      }
                    } 
                    });
                    console.log(tocken);
                    
                }).catch(err=>{
                    console.log(err)
                });
                }).catch(function(err) {
                    console.log("Error: ", err);
                });
              }
        });
            

  }

  getFCM(){
    return  firebase.messaging();
  }
}
