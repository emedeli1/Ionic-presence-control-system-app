import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  usu:any;
  Usuario: any = '';
  Nombre: any = '';
  Clave: any = '';
  IdUsuario!: number;
  mostrarErrorNombre: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private httpservice: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID del usuario desde la ruta
    const idUsuario = this.route.snapshot.paramMap.get('id');
    if (idUsuario) {
      this.IdUsuario = Number(idUsuario);
      this.cargarUsuario(idUsuario);
      
    }
  }

  cargarUsuario(id: string) {
    this.httpservice.obtenerUsuario(id).subscribe(
      (response) => {
        console.log(`Usuario con id ${id} cargado:`, response);
        this.usu = response.body[0];
        console.log(this.usu);
        this.Nombre = this.usu.Nombre;
        console.log(this.usu.Nombre);
        this.Usuario = this.usu.Usuario;
        this.Clave = this.usu.Clave;
      },
      (error) => {
        console.error('Error al cargar usuario:', error);
      }
    );
  }

  guardarUsuario() {
    // Validar que el nombre no esté vacío
    if (!this.Nombre || this.Nombre.trim() === '') {
      this.mostrarErrorNombre = true; // Mostrar mensaje de error
      return;
    }

    // Ocultar mensaje de error si el nombre es válido
    this.mostrarErrorNombre = false;

    this.httpservice.actualizarUsuario(
      this.IdUsuario, 
      this.Nombre,
      this.Usuario,
      this.Clave
    ).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        this.router.navigate(['/gestion-usuarios']); // Regresar a la página de gestión usuarios
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }
}
