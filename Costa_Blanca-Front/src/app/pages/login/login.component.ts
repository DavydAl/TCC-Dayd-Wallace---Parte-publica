import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public usuario = new UsuarioModel();

  frmLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
    lembrar: new FormControl('')
  });




  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private renderer: Renderer2, private elementRef: ElementRef) {
    this.frmLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      lembrar: [false]
    });
  }

  public logar() {
    if (this.frmLogin.valid) {
      let email: string = this.frmLogin.value.email;
      let senha: string = this.frmLogin.value.senha;
      let lembrar: boolean = this.frmLogin.value.lembrar;

      this.usuarioService.logar(email, senha, lembrar).subscribe((response) => {
        if (!response) {
          Object.keys(this.frmLogin.controls).forEach(field => {
            const control = this.frmLogin.get(field);
            if (control && control.invalid) {
              control.markAsTouched({ onlySelf: true });
              control.setErrors({ 'invalid': true });
              const element = this.elementRef.nativeElement.querySelector(`[formControlName="${field}"]`);
              this.renderer.addClass(element, 'invalid-field');
            }
          });
        }
      });
    } else {
      Object.keys(this.frmLogin.controls).forEach(field => {
        const control = this.frmLogin.get(field);
        if (control && control.invalid) {
          control.markAsTouched({ onlySelf: true });
          control.setErrors({ 'invalid': true });
          const element = this.elementRef.nativeElement.querySelector(`[formControlName="${field}"]`);
          this.renderer.addClass(element, 'invalid-field');
        }
      });
    }
  }

}
