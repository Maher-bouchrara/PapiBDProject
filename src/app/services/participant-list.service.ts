import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ParticipantListService {

   private apiUrl = 'http://localhost:8094/participants'; 
  
    constructor(private http: HttpClient) { }
  
    getAllParticipant() {
      return this.http.get<any[]>(this.apiUrl);
    }

    createParticipant(participant: any, profileId: number, structureId: number){
      console.log(participant)
      const body = {
        ...participant
      };
      return this.http.post<any>(this.apiUrl, body, {
        params: {
          profileId: profileId.toString(),
          structureId: structureId.toString()
        }
      });
    }
}
