import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-pessoas',
  templateUrl: './listar-pessoas.component.html',
  standalone: true,
  styleUrls: ['./listar-pessoas.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ListarPessoasComponent implements OnInit {
  pessoas: Pessoa[] = [];
  editMode: { [key: number]: boolean } = {}; // Controla o modo de edição para cada pessoa

  constructor(private pessoaService: PessoaService, private router: Router) {}

  ngOnInit() {
    this.pessoaService.getPessoas().subscribe((data) => {
      this.pessoas = data;
    });
  }

  deletePessoa(id: number) {
    this.pessoaService.deletePessoa(id).subscribe(() => {
      this.pessoas = this.pessoas.filter((p) => p.id !== id);
    });
  }

  editPessoa(pessoa: Pessoa) {
    if (pessoa.id) {  // Verifique se o id está presente
      this.pessoaService.updatePessoa(pessoa.id, pessoa).subscribe(() => {
        this.toggleEditMode(pessoa.id);  // Desativa o modo de edição após a atualização
      });
    } else {
      console.error('ID da pessoa está indefinido!');
    }
  }

  toggleEditMode(id: number) {
    this.editMode[id] = !this.editMode[id];
  }


  navigateToCadastro() {
    this.router.navigate(['/adicionar-pessoa']);
  }
}
