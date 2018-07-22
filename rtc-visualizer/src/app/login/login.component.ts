import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'rtc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authenticationFailed = false;
  credentials = { login: '', password: '' };

  constructor(title: Title) {
    title.setTitle('RTC Visualizer - Login');
  }

  ngOnInit() {}

  authenticate() {}
}
