// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  onLogin() {
    // Ici, vous ajouterez votre logique d'authentification
    // Par exemple, appel à un service d'authentification
    
    console.log('Tentative de connexion avec:', {
      username: this.username,
      password: '********', // Ne pas logger les mots de passe en production
      rememberMe: this.rememberMe
    });

    // Simulation d'une authentification réussie
    // À remplacer par votre véritable logique d'authentification
    if (this.username && this.password) {
      // Redirection vers la page d'accueil après connexion
      this.router.navigate(['/dashboard']);
    }
  }
}