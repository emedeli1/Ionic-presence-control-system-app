import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-editar-trabajo',
  templateUrl: './editar-trabajo.page.html',
  styleUrls: ['./editar-trabajo.page.scss'],
})
export class EditarTrabajoPage implements OnInit {
  tra:any;
  Nombre: any = '';
  IdTrabajo!: number;
  mostrarErrorNombre: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private httpservice: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    const idTrabajo = this.route.snapshot.paramMap.get('id');
    if (idTrabajo) {
      this.IdTrabajo = Number(idTrabajo);
      this.cargarTrabajo(idTrabajo);
    }
  }

  cargarTrabajo(id: string) {
    this.httpservice.obtenerTrabajo(id).subscribe(
      (response) => {
        console.log(`Trabajo con id ${id} cargado:`, response);
        this.tra = response.body[0];
        console.log(this.tra);
        this.Nombre = this.tra.Nombre;
      },
      (error) => {
        console.error('Error al cargar trabajo:', error);
      }
    );
  }

  guardarTrabajo() {
    // Validar que el nombre no esté vacío
    if (!this.Nombre || this.Nombre.trim() === '') {
      this.mostrarErrorNombre = true; // Mostrar mensaje de error
      return;
    }

    // Ocultar mensaje de error si el nombre es válido
    this.mostrarErrorNombre = false;

    this.httpservice.actualizarTrabajo(
      this.IdTrabajo, 
      this.Nombre
    ).subscribe(
      (response) => {
        console.log('Trabajo actualizado:', response);
        this.router.navigate(['/gestion-trabajos']); // Regresar a la página de gestión trabajos
      },
      (error) => {
        console.error('Error al actualizar trabajo:', error);
      }
    );
  }

}
