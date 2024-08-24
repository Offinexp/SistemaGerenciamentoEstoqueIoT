import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {CommonModule, CurrencyPipe} from "@angular/common";

// Defina a interface do Produto, se ainda não estiver definida
interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [
    CurrencyPipe, CommonModule
  ],
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  apiUrl = 'http://localhost:8080/api/produto'; // Ajuste a URL conforme necessário
  private router: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.http.get<Produto[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erro ao listar produtos', error);
        return of([]); // Retorna uma lista vazia em caso de erro
      })
    ).subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }

  editProduto(id: number): void {
    // Implementar lógica para editar o produto
    console.log(`Editando produto com ID: ${id}`);
    // Por exemplo, você pode redirecionar para um formulário de edição
    // this.router.navigate(['/editar-produto', id]);
  }

  deleteProduto(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.http.delete(`${this.apiUrl}/deletar/${id}`).pipe(
        catchError(error => {
          console.error('Erro ao excluir produto', error);
          return of(null); // Retorna nulo em caso de erro
        }),
        map(() => {
          // Atualiza a lista após a exclusão
          this.listarProdutos();
        })
      ).subscribe();
    }
  }
    navigateToCadastro(): void {
      this.router.navigate(['/cadastro-produtos']); // Navegue para a rota de cadastro de produtos
    }
}
