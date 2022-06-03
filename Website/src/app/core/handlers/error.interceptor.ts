import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "src/app/domain/services/authentication.service";
import { CarteiraService } from "src/app/domain/services/carteira.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private carteiraService: CarteiraService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            
            if (err.error instanceof ProgressEvent) {
                return throwError(new HttpErrorResponse({error: "Não foi possivel conectar com o servidor"}));
            }

            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.reset();
                this.carteiraService.reset();
                location.reload();
            }
            return throwError(err);
        }))
    }
}