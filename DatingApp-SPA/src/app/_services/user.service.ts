import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


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
getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  let params = new HttpParams(); // Http header params Data

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page); // this code to add after the url ?pageNumber=
    params = params.append('pageSize', itemsPerPage); // this code to add after the url ?pageNumber=8&pageSize=35
  }

  if (userParams != null) {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

  if (likesParam === 'Likers') {
    params = params.append('likers', 'true');
  }
  if (likesParam === 'Likees') {
    params = params.append('likees', 'true');
  }

  return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) { // null when we dont send pageNumber, and pageSize
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

// this function implemnt in MemberDetailComponant
getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}
updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

setMainPhoto(userId: number, id: number) {
 return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
}

deletePhoto(userId: number, id: number) {
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}

sendLike(id: number, recipientId: number) {
  return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
}
}
