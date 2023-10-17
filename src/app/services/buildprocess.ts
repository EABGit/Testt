import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MyModel} from '../MyModel';
@Injectable({
    providedIn: 'root'
  })
  export class buildprocessService {
  // apiUrl:string = 'https://localhost:7131/User/GetBrandName'
    constructor(private http: HttpClient) { } 
    GetBrandName(): Observable<any[]> {
        return this.http.get<any[]>('https://localhost:7131/api/User/GetBrandName')
      }

      // getAllSourceTypeByBrandName(employeeId: any): Observable<any[]> {

      //   return this.http.get<any[]>('https://localhost:7131/User/GetSourceType/' + employeeId);
      // }
      getAllModelNameByBrandName(brandId: any): Observable<any[]> {

        return this.http.get<any[]>('https://localhost:7131/api/User/GetModelNameList/' + brandId);
      }
      postData(data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const apiUrl = 'https://localhost:7131/api/User/userData/'; // Replace with your API endpoint URL
        return this.http.post(apiUrl, data, { headers });
      }

      AddUsers(UserDetails: MyModel): Observable<any> {
     const   apiUrl= 'https://localhost:7131/api/User/AddNewUser';
     const body = JSON.stringify(UserDetails);
       
          //const body = JSON.stringify(SelectedUserRow);
          console.log('UserDetails',UserDetails)
         // return this.http.post(`${apiUrl}User/AddNewUser`, UserDetails);
          return this.http.post(apiUrl, UserDetails);
        
      }

      private apiUrl = 'https://localhost:7131/api'; // Replace with your API URL

      sendDataToAPI(data: any) {
        return this.http.post(`${this.apiUrl}/User/AddNewUser`, data);
      }
  }