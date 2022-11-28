import { Component, Host, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAnimationOptions } from '@ionic/core';
import { DadosService } from '../dados.service';
import { Router } from '@angular/router';
import INotes from '../interfaces/inotes';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public dadosNotas: INotes[];
  //public modalController: ModalController;
  private servico: DadosService;

  constructor(dadosService: DadosService, controller: ModalController, private router: Router) {
    this.servico = dadosService;
    this.dadosNotas = this.servico.buscarNotas();
    //this.modalController = controller;
  }

  reloadDados(): void {
    this.dadosNotas = this.servico.buscarNotas();
  }

  //async exibirModal(): Promise<void> {
    //const modal = await this.modalController.create({
      //component: **Nome do Component**
    //})
  //}

  criarNota(): void {

    const titulo = "";
    const texto = "";

    const nota = {
      titulo: titulo,
      texto: texto
    }
    this.servico.adicionarNota(nota);
    
    this.router.navigate(['/notes', this.servico.buscarTamanhoDeNotas()])
  }

}
