import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes: any;

  constructor(private autenticacao: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.autenticacao.logout();
  }

  public atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine();
  }

}
