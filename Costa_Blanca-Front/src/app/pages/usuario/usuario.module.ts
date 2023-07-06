import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { UsuarioRoutingModule } from './usuario-routing-module';
import { FiltrarUsuarioComponent } from './filtrar-usuario/filtrar-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CadastroUsuarioComponent,
    ListarUsuarioComponent,
    FiltrarUsuarioComponent,
  ],
  imports: [
    FormsModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ],
  exports: [
    ListarUsuarioComponent],
  providers: [],
  bootstrap: []
})
export class UsuarioModule { }
