import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingService} from "../core/loading-page/loading.service";

@Injectable()
export class InterseptorInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.loadingState.next(true);
    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loadingService.loadingState.next(false);
        }, 300)
      })
    );
  }
}
