import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-nuevo-trabajo',
  templateUrl: './nuevo-trabajo.page.html',
  styleUrls: ['./nuevo-trabajo.page.scss'],
})
export class NuevoTrabajoPage implements OnInit {
  Nombre: any = '';
  mostrarErrorNombre: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpservice: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  nuevoTrabajo() {
    if (!this.Nombre) {
      // Mostrar mensaje de error si el nombre está vacío
      this.mostrarErrorNombre = true;
      return;
    }

    // Ocultar el mensaje de error si el nombre es válido
    this.mostrarErrorNombre = false;

    this.httpservice
      .crearTrabajo(this.Nombre)
      .subscribe(
        (response) => {
          console.log('Trabajo creado: ', response);
          this.router.navigate(['gestion-trabajos']);
        },
        (error) => {
          console.error('Error al crear trabajo: ', error);
        }
      );
  }

}
