import * as firebase from "firebase";

export class BdService {

  public publicar(publicacao: any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push( {titulo: publicacao.titulo } )

    console.log('Chegamos até serviço responsável pelo controle de dados!');

  }
}
