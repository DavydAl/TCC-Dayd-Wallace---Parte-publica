import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutePathEnum } from './enum/routing-enum';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarSenhaComponent } from './pages/login/recuperar-senha/recuperar-senha.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { PaginaPrincipalComponent } from './shared/pagina-principal/pagina-principal.component';
import { DadosEmpresaComponent } from './pages/dados-empresa/dados-empresa.component';
import { PerfilGerencialGuard } from './services/guards/perfil-gerencial-guard.service';
import { CadastroUsuarioComponent } from './pages/usuario/cadastro-usuario/cadastro-usuario.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'recuperar', component: RecuperarSenhaComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  {
    path: '', component: PaginaPrincipalComponent, canActivate: [UsuarioAutenticadoGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(x => x.HomeModule),
        canActivate: [UsuarioAutenticadoGuard, PerfilGerencialGuard]
      },
      {
        path: RoutePathEnum.Usuario,
        loadChildren: () => import('./pages/usuario/usuario.module').then(x => x.UsuarioModule),
        canActivate: [UsuarioAutenticadoGuard, PerfilGerencialGuard]
      },
      {
        path: RoutePathEnum.Funcionario,
        loadChildren: () => import('./pages/funcionario/funcionario.module').then(x => x.FuncionarioModule),
        canActivate: [UsuarioAutenticadoGuard, PerfilGerencialGuard]
      },
      {
        path: RoutePathEnum.Produto,
        loadChildren: () => import('./pages/produto/produto.module').then(x => x.ProdutoModule),
        canActivate: [UsuarioAutenticadoGuard]
      },
      {
        path: RoutePathEnum.CadastrosAuxiliares,
        loadChildren: () => import('./pages/cadastros-auxiliares/cadastros-auxiliares.module').then(x => x.CadastroAuxiliarModule),
        canActivate: [UsuarioAutenticadoGuard, PerfilGerencialGuard]
      },
      {
        path: RoutePathEnum.ClienteFornecedor,
        loadChildren: () => import('./pages/cliente-fornecedor/cliente-fornecedor.module').then(x => x.ClienteFornecedorModule),
        canActivate: [UsuarioAutenticadoGuard]
      },
      {
        path: RoutePathEnum.RetiradaProduto,
        loadChildren: () => import('./pages/retirada-produto/retirada.module').then(x => x.RetiradaProdutoModule),
        canActivate: [UsuarioAutenticadoGuard]
      },
      { path: 'dados-empresa', component: DadosEmpresaComponent, canActivate: [PerfilGerencialGuard] },

      { path: 'edit/:id', component: CadastroUsuarioComponent, canActivate: [UsuarioAutenticadoGuard] },


    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PerfilGerencialGuard]
})
export class AppRoutingModule { }
