import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    console.log(this.email, this.senha);
    this.authService.login(this.email, this.senha).subscribe(
      response => {
        // Armazenar token ou dados do usuário conforme necessário
        console.log('Login bem-sucedido:', response);
        // Redirecionar para a página inicial após o login bem-sucedido
        this.router.navigate(['/home']);
      },
      error => {
        this.errorMessage = 'Credenciais inválidas.';
        console.error('Erro no login:', error);
      }
    );
  }
}
