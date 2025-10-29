import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.page.html',
  styleUrls: ['./nuevo-usuario.page.scss'],
})
export class NuevoUsuarioPage implements OnInit {
  Nombre: any = '';
  Usuario: any = '';
  Clave: any = '';
  mostrarErrorNombre: boolean = false; // Nueva variable para mostrar el error

  constructor(
    private httpservice: HttpService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {}

  nuevoUsuario() {
    if (!this.Nombre) {
      // Mostrar mensaje de error si el nombre está vacío
      this.mostrarErrorNombre = true;
      return;
    }

    // Ocultar el mensaje de error si el nombre es válido
    this.mostrarErrorNombre = false;

    this.httpservice
      .crearUsuario(this.Nombre, this.Usuario, this.Clave)
      .subscribe(
        (response) => {
          console.log('Usuario creado: ', response);
          this.router.navigate(['gestion-usuarios']);
        },
        (error) => {
          console.error('Error al crear usuario: ', error);
        }
      );
  }
}
