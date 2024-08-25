import { Component } from '@angular/core';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {ProdutoService} from "../../services/produto.service";


@Component({
  selector: 'app-adicionar-pessoa',
  templateUrl: './adicionar-pessoa.component.html',
  standalone: true,
  styleUrls: ['./adicionar-pessoa.component.css'],
  imports: [FormsModule, CommonModule]
})

export class AdicionarPessoaComponent {
  // O id não é necessário ao criar uma nova pessoa, então ele pode ser omitido.
  pessoa: Omit<Pessoa, 'id'> = {
    nome: '',
    email: '',
    senha: ''
  };

  constructor(private pessoaService: PessoaService, private router: Router) { }

  onSubmit() {
    // O id é omitido na criação e será atribuído pelo backend.
    this.pessoaService.adicionarPessoa(this.pessoa).subscribe(() => {
      alert('Pessoa adicionada com sucesso!');
      this.resetForm();
    });
  }

  // Função para resetar o formulário após submissão
  resetForm() {
    this.pessoa = {
      nome: '',
      email: '',
      senha: ''
    };
  }


  navigateToCadastro() {
    this.router.navigate(['/adicionar-pessoa']);
  }
}



