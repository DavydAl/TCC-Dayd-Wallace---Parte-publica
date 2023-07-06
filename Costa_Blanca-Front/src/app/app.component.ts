import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './services/Usuario.service';
import { LoadingService } from './services/loading.service';
import { UsuarioModel } from './model/usuario.model';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public loading: boolean = false;
  public router: Router;
  public activatedRoute: ActivatedRoute;
  public usuarioService: UsuarioService;
  public selectedItem: string = '';
  public cadastrosExpanded = false;
  public loadingService: LoadingService;
  public usuarioLogado: UsuarioModel = new UsuarioModel();

  public logado: boolean = false;
  public perfilGerencial: boolean = false;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.usuarioService = injector.get(UsuarioService);
    this.loadingService = injector.get(LoadingService);
    this.selectedItem = localStorage.getItem('selectedItem') || '';
    this.cadastrosExpanded = localStorage.getItem('cadastrosExpanded') === 'true';
    this.logado = localStorage.getItem('logado') !== null ? (localStorage.getItem('logado') === 'true') : false;
    this.perfilGerencial = localStorage.getItem('usuarioG') !== null ? (localStorage.getItem('usuarioG') === 'true') : false;

    const usuarioString = localStorage.getItem('usuarioModel');
    this.usuarioLogado = usuarioString ? JSON.parse(usuarioString) as UsuarioModel : new UsuarioModel();

  }


  navigate(path: string) {
    this.router.navigate([`../${path}`]);
    this.selectedItem = path;
    localStorage.setItem('selectedItem', this.selectedItem);
  }

  toggleCadastros() {
    this.cadastrosExpanded = !this.cadastrosExpanded;
    localStorage.setItem('cadastrosExpanded', this.cadastrosExpanded.toString());
  }

  public reload() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }




  public formatCurrency(value: number) {
    if (typeof value !== 'number') {
      return value;
    }

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formatter.format(value);
  }

  formatarMoeda(valor: number): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(valor);
  }

  parseDate(dateString: string): Date {
    return moment(dateString, 'YYYY-MM-DD').toDate();
  }


  public formatDate(date: string | undefined): string | undefined {
    if (date) {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = (`0${dateObj.getMonth() + 1}`).slice(-2);
      const day = (`0${dateObj.getDate()}`).slice(-2);

      return `${year}-${month}-${day}`;
    }

    return undefined;
  }

  public formatDateExcel(date: string | undefined): string | undefined {
    if (date) {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = (`0${dateObj.getMonth() + 1}`).slice(-2);
      const day = (`0${dateObj.getDate()}`).slice(-2);

      return `${day}-${month}-${year}`;
    }

    return undefined;
  }

  public formatarTelefone(telefone: string): string {
    // Verifique se o telefone é válido
    if (!telefone || telefone.length !== 10) {
      return telefone; // Retorne o valor original se não for possível formatar
    }

    // Aplicar a máscara do telefone
    const parte1 = telefone.slice(0, 2);
    const parte2 = telefone.slice(2, 6);
    const parte3 = telefone.slice(6, 10);

    return `(${parte1}) ${parte2}-${parte3}`;
  }

  public formatarDataExcel(data: string): string {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();

    return `${dia}-${mes}-${ano}`;
  }

  transformReal(value: number): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return formatter.format(value);
  }

}