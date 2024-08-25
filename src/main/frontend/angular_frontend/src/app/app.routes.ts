import { Routes } from '@angular/router';
import { AdicionarPessoaComponent } from './components/adicionar-pessoa/adicionar-pessoa.component';
import { ListarPessoasComponent } from "./components/listar-pessoas/listar-pessoas.component";
import { ListarProdutosComponent } from "./components/listar-produtos/listar-produtos.component";
import { CadastrarProdutosComponent } from "./components/cadastrar-produtos/cadastrar-produtos.component";
import { IndexComponent } from "./components/index/index.component";
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redireciona para o login inicialmente
  { path: 'home', component: IndexComponent },          // Rota para a página inicial
  { path: 'cadastrar-produtos', component: CadastrarProdutosComponent },
  { path: 'listar-produtos', component: ListarProdutosComponent },
  { path: 'adicionar-pessoa', component: AdicionarPessoaComponent },
  { path: 'listar-pessoas', component: ListarPessoasComponent }
];
