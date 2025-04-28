import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationListService {
  private apiUrl = 'http://localhost:8094/formations';

  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
    deleteFormation(formationId: any): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${formationId}`);
    }
    
    getFormationParticipants(formationId:any): Observable<any> {
      return this.http.get(`${this.apiUrl}/${formationId}/participants`);
    }

  createFormateur(formateur: any,employeurId: Number): Observable<any> {
    return this.http.post(`${this.apiUrl}?employeurId=${employeurId}`, formateur);  }
  
  updateFormateur(formateurId: number, formateur: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${formateurId}`, formateur);
    }
  
  getFormationsCount() {
      return this.http.get<number>(`${this.apiUrl}/count`);
    }
  // Nouvelle méthode pour récupérer les budgets mensuels top 3 domaines
  getBudgetsMensuelsTop3(){
    return this.http.get<any[]>(`${this.apiUrl}/stats/budgets-mensuels-top3`);
  }
  getDomainePercentages() {
    return this.http.get<any[]>(`${this.apiUrl}/stats/domaines`);
  }
}
