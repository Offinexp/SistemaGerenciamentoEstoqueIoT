import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonModule, CurrencyPipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

// Defina a interface do Produto
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
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  editMode: { [key: number]: boolean } = {}; // Controla o modo de edição para cada produto
  apiUrl = 'http://localhost:8080/api/produto'; // Ajuste a URL conforme necessário

  constructor(private http: HttpClient, private router: Router) {}

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

  editProduto(produto: Produto): void {
    if (produto.id) {
      this.http.put(`${this.apiUrl}/atualizar/${produto.id}`, produto).pipe(
        catchError(error => {
          console.error('Erro ao atualizar produto', error);
          return of(null); // Retorna nulo em caso de erro
        }),
        map(() => {
          this.toggleEditMode(produto.id); // Desativa o modo de edição após a atualização
        })
      ).subscribe();
    } else {
      console.error('ID do produto está indefinido!');
    }
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

  toggleEditMode(id: number): void {
    this.editMode[id] = !this.editMode[id];
  }

  navigateToCadastro(): void {
    this.router.navigate(['/cadastrar-produtos']); // Navegue para a rota de cadastro de produtos
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.produtos);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produtos');
    const wbout: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'relatorio_produtos.xlsx');
  }
}
