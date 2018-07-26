import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WarenkorbService {

  private apiUrl = 'http://localhost:8090/warenkorb';

  constructor(private http: HttpClient) { }

  berechnung(id: number) {
    const url = `${this.apiUrl}/${id}/berechnung`;

    return this.http.get(url).pipe(map(
      (data: any) => {
        return data;
    }));
  }
}
