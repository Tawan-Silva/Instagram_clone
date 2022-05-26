import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  public cadastrarUsuario(usuario: Usuario): void {
    
    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha!)
    .then((resposta: any) => {
      console.log(resposta);

      // remover a senha do atributo senha do objeto usuario
      delete usuario.senha;

      // enviando infomações para o database do firebase
      // btoa recebe uma string e criptografia que converte para a base 64
      // atob desconverte a criptografia para alfata numerico
      firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`).set(usuario)
    })
    .catch((error: Error) => {
      console.log(error);
      
    })
  }

  public autenticar(email: string, senha: string): void  {
    console.log(email, senha);
    
    firebase.auth().signInWithEmailAndPassword(email, senha)

    .then((resposta: any) => console.log(resposta))
    .catch((error: Error) => console.log(error));
  }
}
