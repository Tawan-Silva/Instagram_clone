import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Progresso } from "../progresso.service";

@Injectable()
export class BdService {

  constructor(private progresso: Progresso){}

  public publicar(publicacao: any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    .push( {titulo: publicacao.titulo } )
    .then((resposta: any) => {

      let nomeImagem = resposta.key; // Key é chave que repesenta respequitiva imagem

      firebase.storage().ref()
    .child(`imagens/${nomeImagem}`)
    .put(publicacao.imagem)
    .on(firebase.storage.TaskEvent.STATE_CHANGED,
      // acompanhamento do progesso do upload
      (snapshot: any) => {
        this.progresso.status = 'andamento';
        this.progresso.estado = snapshot
        // console.log('Snapshot capturado no on() ', snapshot);

        },
        (error) => {
          this.progresso.status = 'erro';
          console.log(error);
        },
        () => {
          this.progresso.status = 'concluido';
          // finalização do processo
          // console.log('upload completo');
      }
    )
    })


  }
}
