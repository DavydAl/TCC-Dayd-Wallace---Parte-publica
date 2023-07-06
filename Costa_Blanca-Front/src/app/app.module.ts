import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { PaginaPrincipalComponent } from './shared/pagina-principal/pagina-principal.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { DadosEmpresaComponent } from './pages/dados-empresa/dados-empresa.component';
import { LoadingService } from './services/loading.service';
import { RecuperarSenhaComponent } from './pages/login/recuperar-senha/recuperar-senha.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    PaginaPrincipalComponent,
    LoginComponent,
    PageNotFoundComponent,
    DadosEmpresaComponent,
    RecuperarSenhaComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
