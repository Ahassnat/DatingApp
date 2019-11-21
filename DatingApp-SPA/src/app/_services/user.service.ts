import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';


// httpOption is somulation to the postman tester take the same value of the header of postman
// use it with the http.get in our function => getUsers and getUser

// const httpOptions = {
//  headers: new HttpHeaders({
//    'Authorization' : 'Bearer ' + localStorage.getItem('token')
//  })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

// this function implemnt in MemberListComponant
getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users');
}

// this function implemnt in MemberDetailComponant
getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}
updateUser(id: number, user: User){
  return this.http.put(this.baseUrl + 'users/' + id, user);
}
}
