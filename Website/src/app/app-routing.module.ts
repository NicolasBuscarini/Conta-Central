import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/security/auth.guard';
import { DashComponent } from './presentation/pages/dash/dash.component';
import { HomeComponent } from './presentation/pages/home/home.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { RegisterComponent } from './presentation/pages/register/register.component';
import { WalletComponent } from './presentation/pages/wallet/wallet.component';
import { SelectCarteiraComponent } from './presentation/pages/dash/select-carteira/select-carteira.component';
import { TransferenciasComponent } from './presentation/pages/wallet/transferencias/transferencias.component';
import { TransferenciaViewComponent } from './presentation/pages/wallet/transferencias/transferencia-view/transferencia-view.component';
import { TransferenciaTransferirComponent } from './presentation/pages/wallet/transferencias/transferencia-transferir/transferencia-transferir.component';
import { ExtratoComponent } from './presentation/pages/wallet/extrato/extrato.component';
import { SaqueComponent } from './presentation/pages/wallet/saque/saque.component';
import { ListSaquesComponent } from './presentation/pages/wallet/saque/list-saques/list-saques.component';
import { ViewSaqueComponent } from './presentation/pages/wallet/saque/view-saque/view-saque.component';
import { DepositarComponent } from './presentation/pages/wallet/deposito/depositar/depositar.component';
import { DepositoListComponent } from './presentation/pages/wallet/deposito/deposito-list/deposito-list.component';
import { DepositoViewComponent } from './presentation/pages/wallet/deposito/deposito-view/deposito-view.component';
import { HomeWalletComponent } from './presentation/pages/wallet/home-wallet/home-wallet.component';
import { SearchCarteiraComponent } from './presentation/pages/wallet/search-carteira/search-carteira.component';
import { CobrancasComponent } from './presentation/pages/wallet/cobrancas/cobrancas.component';
import { CobrarComponent } from './presentation/pages/wallet/cobrancas/cobrar/cobrar.component';
import { RelatorioComponent } from './presentation/pages/dash/relatorio/relatorio.component';
import { CarteirasComponent } from './presentation/pages/wallet/carteira/carteiras/carteiras.component';
import { CarteiraNewComponent } from './presentation/pages/wallet/carteira/carteira-new/carteira-new.component';
import { CarteiraViewComponent } from './presentation/pages/wallet/carteira/carteira-view/carteira-view.component';
import { CarteiraDesativarComponent } from './presentation/pages/wallet/carteira/carteira-desativar/carteira-desativar.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   {
      path: 'dash', component: DashComponent, canActivate: [AuthGuard], children: [
         { path: '', redirectTo: 'select-carteira', pathMatch: 'full' },
         { path: 'home', component: HomeWalletComponent },
         { path: 'select-carteira', component: SelectCarteiraComponent},
         { path: 'relatorio', component: RelatorioComponent}
      ]
   },
   {
      path: 'wallet', component: WalletComponent, canActivate: [AuthGuard], children: [
         { path: '', redirectTo: 'home', pathMatch: 'full' },
         { path: 'home', component: HomeWalletComponent },
         { path: 'transferencias', component: TransferenciasComponent },
         { path: 'transferencia-view', component: TransferenciaViewComponent },
         { path: 'transferencia-transferir', component: TransferenciaTransferirComponent },
         { path: 'extrato', component: ExtratoComponent },
         { path: 'saque', component: SaqueComponent },
         { path: 'list-saques', component: ListSaquesComponent },
         { path: 'view-saque', component: ViewSaqueComponent },
         { path: 'deposito', component: DepositarComponent },
         { path: 'deposito-list', component: DepositoListComponent },
         { path: 'deposito-view', component: DepositoViewComponent },
         { path: 'carteiras', component: CarteirasComponent },
         { path: 'carteira-new', component: CarteiraNewComponent },
         { path: 'carteira-view', component: CarteiraViewComponent },
         { path: 'carteira-desativar', component: CarteiraDesativarComponent },
         { path: 'search-carteira', component: SearchCarteiraComponent },
         { path: 'cobrancas', component: CobrancasComponent},
         { path: 'cobrar', component: CobrarComponent}
      ]
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }