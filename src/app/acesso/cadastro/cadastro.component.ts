import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private auth: AutenticacaoService
    ) { }

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  public cadastrarUsuario(): void {
  console.log(this.formulario);

  let usuario: Usuario = new Usuario(
    this.formulario.value.email,
    this.formulario.value.nome_completo,
    this.formulario.value.nome_usuario,
    this.formulario.value.senha
    )


    this.auth.cadastrarUsuario(usuario)
    .then(() => this.exibirPainelLogin());
  }

  ngOnInit(): void {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }
}
