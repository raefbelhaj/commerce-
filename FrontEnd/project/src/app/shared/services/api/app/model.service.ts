import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Model, ModelCreationInput, ModelUpdateInput } from './model.models';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModelService {

  private apiServerUrl = environment.gatewayUrl;;

  constructor(private readonly http: HttpClient) {
  }

  public getTests(): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.apiServerUrl}/api/test/test/get/all`);
  }

  public getTestById(id: number): Observable<Model> {
    return this.http.get<Model>(`${this.apiServerUrl}/api/test/test/get?id=${id}`);
  }

  public createTest(data: ModelCreationInput): Observable<Model> {
    return this.http.post<Model>(`${this.apiServerUrl}/api/test/test/create`, data);
  }

  public updateTest(id: number, data: ModelUpdateInput): Observable<Model> {
    return this.http.post<Model>(`${this.apiServerUrl}/api/test/test/update?id=${id}`, data);
  }

  public deleteTest(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/api/test/test/delete?id=${id}`);
  }

  public updateImage(id: number, file: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    return this.http.post<void>(`${this.apiServerUrl}/api/test/test/image?id=${id}`, formData);
  }
}
