import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  regisertMode = false;
  constructor( private http: HttpClient) { }

  ngOnInit() {
  }
  registerToggle() {
    this.regisertMode = true;
  }


  cancelRegisterMode(regisertMode: boolean) {
    this.regisertMode = regisertMode;
  }

}
