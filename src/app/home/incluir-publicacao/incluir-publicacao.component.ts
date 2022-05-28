import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { interval, Subject } from 'rxjs';
import { BdService } from 'src/app/services/dados/bd.service';
import { Progresso } from 'src/app/services/progresso.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})

export class IncluirPublicacaoComponent implements OnInit {

  public email!: string | null;
  private imagem: any;
  public progressoPublicacao: string = "pendente";
  public porcentagemUpload?: number;

  public formulario: FormGroup = new FormGroup({
    "titulo": new FormControl(null)
  })

  constructor(
    private bd: BdService,
    private progresso: Progresso
    ) { }


  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user!.email;
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })



    // para o observable
    let continua = new Subject()
    let acompanhamentoUpload = interval(1500).pipe(takeUntil(continua))
    continua.next(true)

    //assinando observable para leitura e acompanhamento do progresso de upload
    acompanhamentoUpload
    .subscribe(() => {

        this.progressoPublicacao = 'andamento';
        if(this.progresso.estado !== undefined)

        this.porcentagemUpload = Math.round(( this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100)

        if(this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido'
          continua.next(false);
          console.log(continua);

        }
      })
  }

  public preparaImagemUpload(event: Event) {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}


