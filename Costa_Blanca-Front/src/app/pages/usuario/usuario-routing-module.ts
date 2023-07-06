import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
const routesUsuario: Routes = [
  { path: '', component: ListarUsuarioComponent },
  { path: 'edit/:id', component: CadastroUsuarioComponent },
  { path: 'novo', component: CadastroUsuarioComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routesUsuario)],
  exports: [RouterModule]
})

export class UsuarioRoutingModule { }
