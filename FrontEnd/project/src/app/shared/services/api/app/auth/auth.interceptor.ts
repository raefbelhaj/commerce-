import type { HttpEvent } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import type {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from "@angular/common/http";

import type { Observable } from "rxjs";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { TokenStorageService } from "./token-storage.service";

const TOKEN_HEADER_KEY = "Authorization"; // for Spring Boot back-end

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly token: TokenStorageService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token),
            });
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
