import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private apiUrl = 'http://localhost:8080';

  constructor(protected http: HttpClient) { }

  public getTaxa(dtAgendamento: any, dtTransferencia: any, vlTransferencia: any): Observable<Number> {
    return this.http.get<any>(`${this.apiUrl}/agendamentos/taxa/${dtAgendamento}/${dtTransferencia}/${vlTransferencia}`).pipe(
      catchError(error => {
        return throwError(error.error);
      })
    );
  };

  public getValorAtualizado(): Observable<Number> {
    return this.http.get<any>(`${this.apiUrl}/agendamentos/valor`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  };

  public getAgendamentos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/agendamentos/buscar`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  };


  public salvarAgendamento(contaDestino: number, contaOrigem: number, vlTransferencia: number,dtAgendamento: any, dtTransferencia: any): Observable<any> {
    const body = {
      contaDestino: contaDestino,
      contaOrigem: contaOrigem,
      vlTransferencia: vlTransferencia,
      dtAgendamento: dtAgendamento,
      dtTransferencia: dtTransferencia
    }

    return this.http.post<any>(`${this.apiUrl}/agendamentos/agendar`,body).pipe(
      catchError(error => {
        alert(error.error);
        return throwError(error);
      })
    );
  };
}