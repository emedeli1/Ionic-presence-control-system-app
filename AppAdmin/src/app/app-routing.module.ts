import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'gestion-usuarios',
    loadChildren: () => import('./gestion-usuarios/gestion-usuarios.module').then( m => m.GestionUsuariosPageModule)
  },
  {
    path: 'gestion-trabajos',
    loadChildren: () => import('./gestion-trabajos/gestion-trabajos.module').then( m => m.GestionTrabajosPageModule)
  },
  {
    path: 'gestion-fichajes',
    loadChildren: () => import('./gestion-fichajes/gestion-fichajes.module').then( m => m.GestionFichajesPageModule)
  },
  {
    path: 'editar-usuario/:id',
    loadChildren: () => import('./editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  },
  {
    path: 'eliminar-usuario',
    loadChildren: () => import('./eliminar-usuario/eliminar-usuario.module').then( m => m.EliminarUsuarioPageModule)
  },
  {
    path: 'nuevo-usuario',
    loadChildren: () => import('./nuevo-usuario/nuevo-usuario.module').then( m => m.NuevoUsuarioPageModule)
  },
  {
    path: 'editar-trabajo/:id',
    loadChildren: () => import('./editar-trabajo/editar-trabajo.module').then( m => m.EditarTrabajoPageModule)
  },
  {
    path: 'nuevo-trabajo',
    loadChildren: () => import('./nuevo-trabajo/nuevo-trabajo.module').then( m => m.NuevoTrabajoPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
