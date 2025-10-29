import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.page.html',
  styleUrls: ['./gestion-usuarios.page.scss'],
})
export class GestionUsuariosPage implements OnInit {
  usuariosArray: any[] = [];
  IdUsuario: number | null=null;
  Nombre: string = "";
  Usuario: string = "";
  Clave: string = "";

  constructor(
    private httpservice: HttpService, 
    public http: HttpClient,
  ) { }

  ngOnInit() {
    // this.httpservice.loadUsuarios().subscribe(
    //   (response)=>{
    //     console.log(response)
    //     this.usuariosArray = response.body;
    //   }
    // )
  }

  ionViewWillEnter() {
    this.httpservice.loadUsuarios().subscribe(
      (response)=>{
        console.log(response)
        this.usuariosArray = response.body;
      }
    )
  }

  deleteUsuario(IdUsuario: string) {
    this.httpservice.eliminarUsuario(IdUsuario).subscribe(
      (response) => {
        console.log('Usuario eliminado:', response);
        // Eliminar el usuario localmente
        this.usuariosArray = this.usuariosArray.filter(usuario => usuario.IdUsuario !== IdUsuario);
      },
      (error) => {
        console.error(`Error al eliminar el usuario con id ${IdUsuario}:`, error);
      }
    );
  }

}
