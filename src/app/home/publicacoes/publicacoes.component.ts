import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { BdService } from 'src/app/services/dados/bd.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email?: string | null;
  public publicacoes: any;

  constructor(private bd: BdService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user?.email;

      this.atualizarTimeLine();
    })
  }

  public atualizarTimeLine(): void {
     this.bd.consultaPublicacoes(this.email!)
    .then((publicacoes: any) => {
     this.publicacoes = publicacoes;
     console.log(publicacoes);
    })
  }
}
