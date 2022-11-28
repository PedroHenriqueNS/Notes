import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import INotes from '../interfaces/inotes';
import { DadosService } from '../dados.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  public rota: ActivatedRoute;
  public id: number;
  public dadosNota: INotes[];
  public notas: INotes;
  private servico: DadosService;

  private result: string;

  constructor(route: ActivatedRoute, dadosServico: DadosService, private actionSheetCtrl: ActionSheetController) {
    this.rota = route;
    this.servico = dadosServico;
    this.dadosNota = this.servico.buscarNotas();
  }

  @HostListener('document:keyup', ['$event'])
  aoDigitar(event: KeyboardEvent) {
    
    const inputTitulo = document.getElementById('titulo') as HTMLInputElement | null;
    const valueTitulo = inputTitulo?.value;

    const inputTexto = document.getElementById('texto') as HTMLInputElement | null;
    const valueTexto = inputTexto?.value;

    
    this.servico.salvarNota(this.id, valueTitulo, valueTexto);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opções',
      buttons: [
        {
          text: 'Apagar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.servico.apagarNota(this.id);
            this.voltar();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  voltar(): void {
    window.history.back();
  }

  ngOnInit() {
    this.id = Number(this.rota.snapshot.paramMap.get('id'));
    this.notas = this.dadosNota.find(p => p.id === this.id);
  }

}
