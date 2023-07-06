import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { BaseService } from './base.service';
import { UsuarioModel } from '../model/usuario.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { FiltroUsuarioModel } from '../model/filtros/filtro-usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService {
  public snackBarService: SnackbarService;
  public usuarioModel: UsuarioModel = new UsuarioModel();

  public httpClient: HttpClient;
  public router: Router
  constructor(injector: Injector, private snackBar: MatSnackBar) {
    super();
    this.snackBarService = injector.get(SnackbarService);
    this.httpClient = injector.get(HttpClient);
    this.router = injector.get(Router);
  }

  public logar(email: string, senha: string, lembrar: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'email': email,
      'password': senha
    });

    return this.httpClient.get<string>(`${this.urlApi}/login`, { headers })
      .pipe(
        catchError((error) => {
          this.snackBarService.exibirMensagem('Não foi possível acessar. Dados incorretos ou usuário inexistentes', 'error');
          return throwError(error);
        }),
        tap((resposta) => {

          if (resposta === '' || resposta == null) {
            this.snackBarService.exibirMensagem('Não foi possível acessar. Dados incorretos ou usuário inexistentes', 'error');
          } else {
            localStorage.setItem('logado', JSON.stringify(lembrar));
            this.editarUsuario(parseInt(resposta)).subscribe({
              next: (result) => {
                this.usuarioModel = { ...this.usuarioModel, ...result };
                localStorage.setItem('usuarioModel', JSON.stringify(this.usuarioModel));
                localStorage.setItem('usuarioG', JSON.stringify(this.usuarioModel.perfilGerencial));
                this.router.navigate(['']);
              },
              error: (error: HttpErrorResponse) => {
                // Tratar o erro conforme necessário
              }
            });

          }
        })
      );
  }



  public inativarUsuario(usurioId: number) {
    return this.httpClient.put<number>(`${this.urlApi}/inativarUsuario`, usurioId)
  }

  public deslogar() {
    localStorage.clear()
    this.router.navigate(['login']);
  }

  salvarUsuario(usuarioModel: UsuarioModel): Observable<any> {
    if (usuarioModel.id == 0) {
      return this.httpClient.post<number>(`${this.urlApi}/cadastraUsuario`, usuarioModel);
    } else {
      return this.httpClient.put<number>(`${this.urlApi}/updateUsuario`, usuarioModel);
    }
  }


  public listarUsuarios(filtro: FiltroUsuarioModel): Observable<UsuarioModel[]> {
    let params = new HttpParams();

    if (filtro.email !== '' && filtro.email !== undefined) {
      params = params.set('email', filtro.email);
    }

    if (filtro.nome !== '' && filtro.nome !== undefined) {
      params = params.set('nome', filtro.nome);
    }

    if (filtro.cpf !== '' && filtro.cpf !== undefined) {
      params = params.set('cpf', filtro.cpf);
    }

    if (filtro.status === 'true' || filtro.status === 'false') {
      params = params.set('status', filtro.status);
    }

    return this.httpClient.get<UsuarioModel[]>(`${this.urlApi}/listUser`, { params });
  }


  public redefinirSenha(usuarioId: number, senha: string) {
    let params = new HttpParams();
    params = params.set('id', usuarioId.toString());
    params = params.set('nova_senha', senha);

    return this.httpClient.put<any>(`${this.urlApi}/updatePassword`, null, { params });
  }


  public editarUsuario(usuarioId: number) {
    let params = new HttpParams();
    params = params.set('id', usuarioId.toString());
    return this.httpClient.get<UsuarioModel>(`${this.urlApi}/user`, { params });
  }

  public recuperarSenha(email: string, cpf: string,) {
    let params = new HttpParams();
    params = params.set('email', email.toString());
    params = params.set('cpf', cpf);
    return this.httpClient.get<string>(`${this.urlApi}/email`, { params })
  }

  get logado(): boolean {

    return localStorage.getItem('logado') ? true : false;
  }

  get perfilGerencia(): boolean {

    const usuarioModel = localStorage.getItem('usuarioModel');
    if (usuarioModel) {
      const usuario = JSON.parse(usuarioModel);
      return usuario.perfilGerencial || false;
    }
    return false;
  }

}