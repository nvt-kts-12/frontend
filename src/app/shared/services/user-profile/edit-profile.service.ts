import { Injectable } from '@angular/core';
import { User, AuthStore,AuthQuery } from '../../store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  user: User;
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private authStore : AuthStore) {
     
   }


  update(user: User): Promise<User> {
    const url = "/user/edit-profile";
    const token = JSON.parse(localStorage.getItem("AkitaStores")).auth.token;
    let headers = {'Content-Type':'application/json', "Authorization":"Bearer " + token };
   
    return this.http
      .put(url, JSON.stringify(user), {headers: headers})
      .toPromise()
      .then((user) => this.authStore.updateRoot((state) => ({
        user: user
      })))

      .catch(this.handleError); 
  }
 
  handleError(handleError: Error): Promise<any> {
    throw new Error(handleError.message);
  }
}


