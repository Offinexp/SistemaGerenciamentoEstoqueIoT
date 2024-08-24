import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/api/produto'; // Ajuste a URL conforme necessário

  constructor(private http: HttpClient) {}

  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/adicionar`, produto);
  }

  // Outros métodos para listar, atualizar e deletar produtos podem ser adicionados aqui
}
