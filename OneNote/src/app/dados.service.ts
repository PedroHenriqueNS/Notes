import { Injectable } from '@angular/core';

import INotes from './interfaces/inotes';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  public notas: INotes[] = []
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
    this.storage.create().then(() => console.log('Armazenamento Criado'));
    this.storage.get('notas')
      .then(notas => this.notas.push(...notas))
      .catch(() => this.storage.set('notas', this.notas));
  }

  buscarNotas(): INotes[] {
    return this.notas;
  }
  buscarTamanhoDeNotas(): number {
    return this.notas.length;
  }

  adicionarNota(nota: INotes): void {
    nota.id = this.notas.length + 1;
    

    this.notas.push(nota)

    this.atualizarIds();

    this.storage.set('notas', this.notas);
  }

  salvarNota(id: number, titulo: string, texto: string): void {
    this.notas[id - 1].titulo = titulo;
    this.notas[id - 1].texto = texto;
    this.storage.set('notas', this.notas);
  }

  apagarNota(id: number): void {
    this.notas.splice(id - 1, 1);
    this.atualizarIds();
    this.storage.set('notas', this.notas);

  }

  atualizarIds(): void {
    this.notas.forEach(notas => notas.id = this.notas.indexOf(notas) + 1);
  }
}
