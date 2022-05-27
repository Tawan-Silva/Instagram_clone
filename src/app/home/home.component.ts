import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private autenticacao: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    
  }

}
