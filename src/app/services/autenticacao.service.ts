import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  public token_id!: any;

  constructor(private router: Router) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {

  return  firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha!)
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

    .then((resposta: any) => {
      firebase.auth().currentUser!.getToken()
      .then((idToken: string) => {
        this.token_id = idToken
        localStorage.setItem('idToken', idToken)
        this.router.navigate(['/home']);
      })
    })
    .catch((error: Error) => console.log(error));
  }

  public autenticado(): boolean {

    if(this.token_id === undefined && localStorage.getItem('idToken') != null){
      this.token_id = localStorage.getItem('idToken')
  }

  if(this.token_id === undefined){
      this.router.navigate(['/'])
  }
  return this.token_id !== undefined
  }

  public logout(): void {
    localStorage.removeItem("idToken")
    firebase.auth().signOut()
    .then(() => {
      this.token_id = undefined;
      this.router.navigate(['/']);
    })
  }
}
