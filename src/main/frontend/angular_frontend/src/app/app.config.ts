import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser"; // Importe o HttpClientModule
import { ApplicationConfig } from '@angular/core';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import {PessoaService} from "./services/pessoa.service";
import {ProdutoService} from "./services/produto.service";
import {CadastrarProdutosComponent} from "./components/cadastrar-produtos/cadastrar-produtos.component";
import {ListarProdutosComponent} from "./components/listar-produtos/listar-produtos.component";
import {IndexComponent} from "./components/index/index.component"; // Importar ProdutoService
import { LoginComponent } from "./components/login/login.component";

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    ProdutoService,
    PessoaService
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    CadastrarProdutosComponent,
    ListarProdutosComponent,
    IndexComponent,
  ],  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
};
