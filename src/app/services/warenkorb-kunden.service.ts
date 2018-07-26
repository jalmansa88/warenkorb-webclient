import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WarenkorbKundenService {
  private apiUrl = 'http://localhost:8090/kunde';

  constructor(private http: HttpClient) {}

  delete(id: number) {
    const url = `${this.apiUrl}/${id}/delete`;

    return this.http.delete(url);
  }

  update(kunde: any) {
    const url = `${this.apiUrl}/${kunde.id}/update`;
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    return this.http.put(url, kunde, {headers});
  }

  findKundenById(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.getApiCall(url);
  }

  findAll() {
    const url = `${this.apiUrl}/all`;
    return this.getApiCall(url);
  }

  create(kunde: any) {
    const url = `${this.apiUrl}/create`;

    return this.postApiCall(url, kunde);
  }

  private getApiCall(url: string) {
    return this.http.get(url).pipe(map(
      (data: any) => {
        return data.apiContent;
      }));
  }

  private postApiCall(url: string, body: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post(url, body, {headers}).pipe(map(
      (data: any) => {
        return data.apiContent;
      }));
  }

}
