import { Injectable } from "@angular/core";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import type { Observable } from "rxjs";
import { environment } from "../../../../../../environments/environment";

const AUTH_API = environment.gatewayUrl + '/auth';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + "/login",
      {
        email,
        password,
        
      },
      httpOptions
    );
  }

  public signup(email: string, password: string, fullName: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/signup',
      {
        email,
        password,
        fullName
      },
      httpOptions
    );
  }
  
}

