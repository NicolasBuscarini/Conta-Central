import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './presentation/pages/home/home.component';
import { DashComponent } from './presentation/pages/dash/dash.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { RegisterComponent } from './presentation/pages/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './core/handlers/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HeaderAuthSharedComponent } from './presentation/shared/header-auth-shared/header-auth-shared.component';
import { SelectCarteiraComponent } from './presentation/pages/dash/select-carteira/select-carteira.component';
import { WalletComponent } from './presentation/pages/wallet/wallet.component';
import { SaqueComponent } from './presentation/pages/wallet/saque/saque.component';
import { ListSaquesComponent } from './presentation/pages/wallet/saque/list-saques/list-saques.component';
import { ViewSaqueComponent } from './presentation/pages/wallet/saque/view-saque/view-saque.component';
import { HomeWalletComponent } from './presentation/pages/wallet/home-wallet/home-wallet.component';
import { DepositarComponent } from './presentation/pages/wallet/deposito/depositar/depositar.component';
import { DepositoListComponent } from './presentation/pages/wallet/deposito/deposito-list/deposito-list.component';
import { DepositoViewComponent } from './presentation/pages/wallet/deposito/deposito-view/deposito-view.component';
import { ExtratoComponent } from './presentation/pages/wallet/extrato/extrato.component';
import { ExtratoCarteiraComponent } from './presentation/pages/wallet/extrato/extrato-carteira/extrato-carteira.component';
import { ExtratoUserComponent } from './presentation/pages/wallet/extrato/extrato-user/extrato-user.component';
import { TransferenciasComponent } from './presentation/pages/wallet/transferencias/transferencias.component';
import { TransferenciaTransferirComponent } from './presentation/pages/wallet/transferencias/transferencia-transferir/transferencia-transferir.component';
import { TransferenciaViewComponent } from './presentation/pages/wallet/transferencias/transferencia-view/transferencia-view.component';
import { SearchCarteiraComponent } from './presentation/pages/wallet/search-carteira/search-carteira.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CobrancasComponent } from './presentation/pages/wallet/cobrancas/cobrancas.component';
import { CobrarComponent } from './presentation/pages/wallet/cobrancas/cobrar/cobrar.component';
import { CobrancaPendenteComponent } from './presentation/pages/wallet/cobrancas/cobranca-pendente/cobranca-pendente.component';
import { RelatorioComponent } from './presentation/pages/dash/relatorio/relatorio.component';
import { CarteirasComponent } from './presentation/pages/wallet/carteira/carteiras/carteiras.component';
import { CarteiraNewComponent } from './presentation/pages/wallet/carteira/carteira-new/carteira-new.component';
import { CarteiraViewComponent } from './presentation/pages/wallet/carteira/carteira-view/carteira-view.component';
import { CarteiraDesativarComponent } from './presentation/pages/wallet/carteira/carteira-desativar/carteira-desativar.component';
import { NgxMaskModule } from 'ngx-mask'
import { MenuMobileSharedComponent } from './presentation/shared/menu-mobile-shared/menu-mobile-shared.component';
import { SidebarAuthSharedComponent } from './presentation/shared/sidebar-auth-shared/sidebar-auth-shared.component';
import { SideBarLinksSharedComponent } from './presentation/shared/side-bar-links-shared/side-bar-links-shared.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SaqueComponent,
    ListSaquesComponent,
    ViewSaqueComponent,
    HomeWalletComponent,
    CarteirasComponent,
    CarteiraNewComponent,
    CarteiraDesativarComponent,
    CarteiraViewComponent,
    CarteirasComponent,
    DepositarComponent,
    DepositoListComponent,
    DepositoViewComponent,
    ExtratoComponent,
    ExtratoCarteiraComponent,
    ExtratoUserComponent,
    SaqueComponent,
    DashComponent,
    TransferenciasComponent,
    TransferenciaTransferirComponent,
    TransferenciaViewComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderAuthSharedComponent,
    SelectCarteiraComponent,
    WalletComponent,
    SearchCarteiraComponent,
    CobrancasComponent,
    CobrarComponent,
    CobrancaPendenteComponent,
    RelatorioComponent,
    MenuMobileSharedComponent,
    SidebarAuthSharedComponent,
    SideBarLinksSharedComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    NgxMaskModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }