import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Carteira } from 'src/app/domain/models/carteira';
import { CobrancaDTO } from 'src/app/domain/models/cobrancaDto';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { CobrancaService } from 'src/app/domain/services/cobranca.service';

@Component({
   selector: 'app-cobrar',
   templateUrl: './cobrar.component.html',
   styleUrls: ['./cobrar.component.scss']
})
export class CobrarComponent implements OnInit {

   cobrancaDto: CobrancaDTO;
   cobrancaForm: FormGroup;
   loading = false;
   submitted = false;
   returnUrl: string;
   Carteiras: Carteira[];
   carteira: Carteira;
   error = '';

   constructor(
      private formBuilder: FormBuilder,
      private cobrancaService: CobrancaService,
      private route: Router,
      private carteiraService: CarteiraService
   ) { }

   ngOnInit(): void {
      this.cobrancaForm = this.formBuilder.group({
         Valor: ['', Validators.required],
         Descricao: [''],
         FromCarteiraId: ['', Validators.required],
         ToCarteiraId: ['', Validators.required],
      });

      this.carteiraService.listMinhasCarteiras().subscribe(ret =>{
         this.Carteiras = ret;
       });
   }

   get f() { return this.cobrancaForm.controls; }


   onSubmit() {
      this.submitted = true;

      if(this.f.FromCarteiraId.value == this.f.ToCarteiraId.value){
         this.error = "Não é possivel cobrar a mesma Carteira";
         return;
      }

      // stop here if form is invalid
      if (this.cobrancaForm.invalid) {
         return;
      }
      
      this.cobrancaDto = {
         Valor: this.f.Valor.value,
         Descricao: this.f.Descricao.value,
         FromCarteiraId: this.f.FromCarteiraId.value,
         ToCarteiraId: this.f.ToCarteiraId.value
      }

      this.loading = true;
      this.cobrancaService.createCobranca(this.cobrancaDto).pipe(first())
      .subscribe(
         data => {
            console.log("cobranca redirect");
            this.route.navigate(['/wallet/cobrancas']);
         },
         error => {
            this.error = error;
            this.loading = false;
         }
      );
   }
}
