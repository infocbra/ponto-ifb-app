import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TelaPrincipalPage } from '../tela-principal/tela-principal';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  cpf = "";
  response: string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) { }
  
  ionViewWillEnter() {
    this.response = '';
    this.cpf = '';
  }

  presentAlert() {
      let alert = this.alertCtrl.create({
        title: 'CPF Inválido',
        subTitle: 'Insira um CPF válido',
        buttons: ['Ok']
      });
      alert.present();
  }

  validaCPF(cpf){
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
          return false;
    for (i = 0; i < cpf.length - 1; i++)
          if (cpf.charAt(i) != cpf.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
          {
          numeros = cpf.substring(0,9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
                return false;
          numeros = cpf.substring(0,10);
          soma = 0;
          for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
                return false;
          return true;
          }
    else
        return false;
  }

  goToTelaPrincipal(params){
    console.log(this.cpf);

    // if (!params) params = {}
    if (!this.validaCPF(this.cpf)){
      console.log('CPF INVÁLIDO');
      this.presentAlert();
    } else {
      console.log('CPF VÁLIDO!');
      this.navCtrl.push(TelaPrincipalPage, {cpf: this.cpf});    
    }
  }
}
