import { Component, Inject, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';

@Inject({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  constructor(private auth: AutenticacaoService) { }


  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  
  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
    console.log("foi");
  }

  public autenticar(): void {
    this.auth.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
      );
    
  }

  ngOnInit(): void {
  }
}
