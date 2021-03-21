import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'depot',
    loadChildren: () => import('./depot/depot.module').then( m => m.DepotPageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./retrait/retrait.module').then( m => m.RetraitPageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'frais',
    loadChildren: () => import('./frais/frais.module').then( m => m.FraisPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'mes-transaction',
    loadChildren: () => import('./mes-transaction/mes-transaction.module').then( m => m.MesTransactionPageModule)
  },
  {
    path: 'toutes-mes-transaction',
    loadChildren: () => import('./toutes-mes-transaction/toutes-mes-transaction.module').then( m => m.ToutesMesTransactionPageModule)
  },
  {
    path: 'paramettere/:idUpdate',
    loadChildren: () => import('./paramettere/paramettere.module').then( m => m.ParametterePageModule)
  },
  {
    path: 'ajout-user',
    loadChildren: () => import('./ajout-user/ajout-user.module').then( m => m.AjoutUserPageModule)
  },
  {
    path: 'list-user',
    loadChildren: () => import('./list-user/list-user.module').then( m => m.ListUserPageModule)
  },
  {
    path: 'depot-agence',
    loadChildren: () => import('./depot-agence/depot-agence.module').then( m => m.DepotAgencePageModule)
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
