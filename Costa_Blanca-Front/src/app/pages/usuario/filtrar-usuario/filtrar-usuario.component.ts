import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { FiltroUsuarioModel } from 'src/app/model/filtros/filtro-usuario.model';

@Component({
  selector: 'filtrar-usuario',
  templateUrl: './filtrar-usuario.component.html',
  styleUrls: ['./filtrar-usuario.component.css']
})
export class FiltrarUsuarioComponent extends AppComponent implements OnInit {
  public filtro: FiltroUsuarioModel = new FiltroUsuarioModel();
  @Output() public filtroAlterado: EventEmitter<FiltroUsuarioModel> = new EventEmitter<FiltroUsuarioModel>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.filtro.status = 'true';
    this.filtrar();
  }

  public filtrar() {
    this.filtro.nome;
    this.filtro.cpf;
    this.filtro.status;
    this.filtro.email;
    this.filtroAlterado.emit(this.filtro);
  }
}
