import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CadastrarProdutosComponent {
    produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    quantidade: 0
  };

  constructor(private produtoService: ProdutoService, private router: Router) {}

  cadastrarProduto(form: NgForm) {
    if (form.valid) {
      this.produtoService.addProduto(this.produto).subscribe(() => {
        this.router.navigate(['/listar-produtos']);
      });
    }
  }
}
