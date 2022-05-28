import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Progresso } from "../progresso.service";

@Injectable()
export class BdService {

  constructor(private progresso: Progresso) { }

  public publicar(publicacao: any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
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

  public consultaPublicacoes(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) => {

      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
      .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          console.log(snapshot.val());

          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {

            let publicacao = childSnapshot.val(); // val recupera apenas os valores
            publicacao.key = childSnapshot.key;
            publicacoes.push(publicacao)
            // consultar a url da imagem
          })
          return publicacoes.reverse(); // inverte a ordem do aray
        })
        .then((publicacoes: any) => {
          publicacoes.forEach((publicacao: any) => {

          firebase.storage().ref()
          .child(`imagens/${publicacao.key}`)
          .getDownloadURL()
          .then((url: string) => {
            publicacao.url_imagem = url;

            // consultar o nome do usuário
            firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
              .once('value')
              .then((snapshot: any) => {
                publicacao.nome_usuario = snapshot.val().nome_usuario;
                publicacoes.push(publicacao)
              })
            })
          })
          resolve(publicacoes);
        })
    })
  }
}

/*

 */
