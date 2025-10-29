import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-trabajos',
  templateUrl: './gestion-trabajos.page.html',
  styleUrls: ['./gestion-trabajos.page.scss'],
})
export class GestionTrabajosPage implements OnInit {
  trabajosArray: any[] = [];
  IdTrabajo: number | null=null;
  Nombre: string = "";

  constructor(
    private httpservice: HttpService,
    public http: HttpClient,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.httpservice.loadTrabajos().subscribe(
      (response)=>{
        console.log(response)
        this.trabajosArray = response.body;
      }
    )
  }

  deleteTrabajo(IdTrabajo: string) {
    this.httpservice.eliminarTrabajo(IdTrabajo).subscribe(
      (response) => {
        console.log('Trabajo eliminado:', response);
        // Eliminar el usuario localmente
        this.trabajosArray = this.trabajosArray.filter(trabajo => trabajo.IdTrabajo !== IdTrabajo);
      },
      (error) => {
        console.error(`Error al eliminar el trabajo con id ${IdTrabajo}:`, error);
      }
    );
  }

}
