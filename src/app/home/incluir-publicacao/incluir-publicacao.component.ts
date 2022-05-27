import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { BdService } from 'src/app/services/dados/bd.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})

export class IncluirPublicacaoComponent implements OnInit {

  public email!: string | null;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: BdService
  ) { }


  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
     this.email = user!.email ;
    })
  }

  public publicar() {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
    });

  }


}
