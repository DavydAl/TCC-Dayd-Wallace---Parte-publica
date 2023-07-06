import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { config } from 'rxjs/internal/config';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  exibirMensagem(mensagem: string, tipo: 'success' | 'error'): void {
    const config = new MatSnackBarConfig();
    config.duration = 1100;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    config.panelClass = tipo === 'error' ? ['snackbar-error'] : ['snackbar-success'];
    this.snackBar.open(mensagem, 'Fechar', config);
  }
}
