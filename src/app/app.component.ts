import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'app3';


  ngOnInit(): void {

    const firebaseConfig = {
      apiKey: "AIzaSyAF4QQW47U5mByw4y19u35V4mqqssjVvFg",
      authDomain: "jta-instagram-clone-eda63.firebaseapp.com",
      projectId: "jta-instagram-clone-eda63",
      storageBucket: "jta-instagram-clone-eda63.appspot.com",
      messagingSenderId: "866357845089",
      appId: "1:866357845089:web:15094826216050f7b41e20",
      databaseURL: "https://jta-instagram-clone-eda63-default-rtdb.firebaseio.com/"
    };

    firebase.initializeApp(firebaseConfig)
  }
}
