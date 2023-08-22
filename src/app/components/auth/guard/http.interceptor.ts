import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
// import { AppToastService } from '../app-toast/app-toast.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private currentUserService: AuthService,
    //  private appToastService: AppToastService
     ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.currentUserService.currentUser?.token) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + this.currentUserService.currentUser.token
        }
      });
    }
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.ok)
            // we can add here nice toaster if request success
            console.log(event.status, event.statusText, event.url);
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          // this.appToastService.error("Something wrong! Try again.");
          console.error(err.message);
        }
        return of(err);
      }));
  }
}
