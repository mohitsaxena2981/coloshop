// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { map, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { User } from '../models/user';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserServiceService {

//   apiURLUsers = environment.apiURL + 'users';

//   constructor(private http : HttpClient, private router : Router) { }

//   // login(email:string, password:string):Observable<{token:string, user:string, isAdmin:boolean}>{
//   //   return this.http.post<{token:string, user:string, isAdmin:boolean}>(`${this.apiURLUsers}/login`, {email, password}).pipe(
//   //     map(userInfo =>{
//   //       localStorage.setItem('user', userInfo.user);
//   //       if(userInfo.isAdmin !== undefined){
//   //         localStorage.setItem('userAdmin', JSON.stringify(userInfo.isAdmin));
//   //       }else{
//   //         localStorage.setItem('userAdmin', JSON.stringify(false));
//   //       }
//   //       //localStorage.setItem('token', userInfo.token);
//   //       this.router.navigate(['/']);
//   //       return userInfo;
//   //     })
//   //   )
//   // }

//   login(email: string, password: string): Observable<{ token: string, user: string, isAdmin: boolean }> {
//     return this.http.post<{ token: string, user: string, isAdmin: boolean }>(`${this.apiURLUsers}/login`, { email, password }).pipe(
//       map(userInfo => {
//         localStorage.setItem('user', userInfo.user);
//         if (userInfo.isAdmin !== undefined) {
//           localStorage.setItem('userAdmin', JSON.stringify(userInfo.isAdmin));
//         } else {
//           localStorage.setItem('userAdmin', JSON.stringify(false));
//         }
//         this.router.navigate(['/']);
//         return userInfo;
//       })
//     );
//   }
  

//   signup(name:string,email:string, password:string, isAdmin?:boolean):Observable<User>{
//     return this.http.post<User>(`${this.apiURLUsers}/register`, {name,email,password,isAdmin});
//   }

//   getAllUsers():Observable<User[]>{
//     return this.http.get<User[]>(this.apiURLUsers)
//   }

//   getOneUser(userId:string):Observable<User>{
//     return this.http.get<User>(`${this.apiURLUsers}/${userId}`)
//   }

//   createUser(user:User):Observable<User>{
//     return this.http.post<User>(`${this.apiURLUsers}/register`, user)
//   }

//   updateUser(user:User, userId : string):Observable<User>{
//     return this.http.put<User>(`${this.apiURLUsers}/${userId}`, user)
//   }

//   deleteUser(userId:string):Observable<User>{
//     return this.http.delete<User>(`${this.apiURLUsers}/${userId}`);
//   }
// }





// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { User } from '../models/user';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserServiceService {
//   apiURLUsers = environment.apiURL + 'users';
//   private userLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   public userLoggedIn$: Observable<boolean> = this.userLoggedInSubject.asObservable();

//   constructor(private http: HttpClient, private router: Router) {}

//   login(email: string, password: string): Observable<{ token: string; user: string; isAdmin: boolean }> {
//     return this.http.post<{ token: string; user: string; isAdmin: boolean }>(`${this.apiURLUsers}/login`, { email, password }).pipe(
//       map(userInfo => {
//         localStorage.setItem('user', userInfo.user);
//         if (userInfo.isAdmin !== undefined) {
//           localStorage.setItem('userAdmin', JSON.stringify(userInfo.isAdmin));
//         } else {
//           localStorage.setItem('userAdmin', JSON.stringify(false));
//         }
//         this.userLoggedInSubject.next(true);
//         this.router.navigate(['/']);
//         return userInfo;
//       })
//     );
//   }

//   signup(name: string, email: string, password: string,address:string,answer:string, isAdmin?: boolean): Observable<User> {
//     return this.http.post<User>(`${this.apiURLUsers}/register`, { name, email, password,address,answer, isAdmin });
//   }

//   getAllUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.apiURLUsers);
//   }

//   getOneUser(userId: string): Observable<User> {
//     return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
//   }

//   createUser(user: User): Observable<User> {
//     return this.http.post<User>(`${this.apiURLUsers}/register`, user);
//   }

//   updateUser(user: User, userId: string): Observable<User> {
//     return this.http.put<User>(`${this.apiURLUsers}/${userId}`, user);
//   }

//   deleteUser(userId: string): Observable<User> {
//     return this.http.delete<User>(`${this.apiURLUsers}/${userId}`);
//   }

//   logout(): void {
//     localStorage.removeItem('user');
//     localStorage.removeItem('userAdmin');
//     this.userLoggedInSubject.next(false);
//     this.router.navigate(['/users/login']);
//   }
// }






import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  apiURLUsers = environment.apiURL + 'users';
  private userLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userLoggedIn$: Observable<boolean> = this.userLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{ token: string; user: string; isAdmin: boolean }> {
    return this.http.post<{ token: string; user: string; isAdmin: boolean }>(`${this.apiURLUsers}/login`, { email, password }).pipe(
      map(userInfo => {
        localStorage.setItem('user', userInfo.user);
        if (userInfo.isAdmin !== undefined) {
          localStorage.setItem('userAdmin', JSON.stringify(userInfo.isAdmin));
        } else {
          localStorage.setItem('userAdmin', JSON.stringify(false));
        }
        this.userLoggedInSubject.next(true);
        this.router.navigate(['/']);
        return userInfo;
      })
    );
  }

  signup(name: string, email: string, password: string,address:string,answer:string, isAdmin?: boolean): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/register`, { name, email, password,address,answer, isAdmin });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getOneUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/register`, user);
  }

  updateUser(user: User, userId: string): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${userId}`, user);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiURLUsers}/${userId}`);
  }

  // checkSecurityAnswer(email: string, securityAnswer: string): Observable<boolean> {
  //   return this.http.post<boolean>(`${this.apiURLUsers}/security-answer`, { email, securityAnswer });
  // }

  // checkSecurityAnswer(email: string, securityAnswer: string): Observable<boolean> {
  //   return this.http.post<boolean>(`${this.apiURLUsers}/security-answer`, { email, securityAnswer })
  //     .pipe(
  //       catchError((error) => {
  //         console.error('Error checking security answer:', error);
  //         return of(false); // Return false in case of an error
  //       })
  //     );
  // }


  // checkSecurityAnswer(email: string, securityAnswer: string): Observable<boolean> {
  //   return this.http.post<boolean>(`${this.apiURLUsers}/security-answer`, { email, securityAnswer })
  //     .pipe(
  //       catchError((error) => {
  //         console.error('Error checking security answer:', error);
  //         return of(false); // Return false in case of an error
  //       })
  //     );
  // }




  // checkSecurityAnswer(email: string, securityAnswer: string): Observable<boolean> {
  //   return this.http.post<any>(`${this.apiURLUsers}/security-answer`, { email, securityAnswer })
  //     .pipe(
  //       map(response => {
  //         // Check if the response contains a valid result
  //         return response === 'OK'; // Adjust this condition based on your server response
  //       }),
  //       catchError((error) => {
  //         console.error('Error checking security answer:', error);
  //         return of(false); // Return false in case of an error
  //       })
  //     );
  // }
  checkSecurityAnswer(email: string, securityAnswer: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiURLUsers}/security-answer`, { email, securityAnswer })
      .pipe(
        catchError((error) => {
          console.error('Error checking security answer:', error);
          return of(false); // Return false in case of an error
        })
      );
  }
  
  

  resetPassword(email: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.apiURLUsers}/reset-password`, { email, newPassword });
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userAdmin');
    this.userLoggedInSubject.next(false);
    this.router.navigate(['/users/login']);
  }
}


