import { ServerError } from './../apperrors/servererror';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {NotFoundError} from '../apperrors/notfound'
import {DuplicateError} from '../apperrors/duplicateError'
import {AppError} from '../apperrors/apperror'
import { Observable } from "rxjs/Observable";
import { Url } from '../common/serverurl.class';
@Injectable()
export class CommonService {

  constructor(public http:Http) {}
   postValue(value,page){
     debugger;
     let headers = new Headers();
    //  headers.append("Access-Control-Allow-Origin", '*');
     headers.append('X-CSRFToken','W8KGsTlrMbcIbiJha3U8ogyiBYXXijQ3a4qNbHVl4o9qCGmeKR6wZunNjeyr7Oun'); 
     headers.append('Authorization','Token 054a687c5755e22ee8ff91303d538540aaacfaa8'); 
    //  headers.append('content-type','application/x-www-form-urlencoded');
    headers.append('email',localStorage.getItem('email')); 
     headers.append('guestEmail',localStorage.getItem('guestEmail'));
    //  headers.append('Accept','application/json');
    
      console.log(headers)
      let options = new RequestOptions({ headers: headers });
    return this.http.post(`${Url.url}/${page}`,value, options)
    .map(res => res.json())
    .catch((err)=>{
        if(err.status == 404)
         return  Observable.throw(new NotFoundError()) 
        else if(err.status == 405)
          return Observable.throw(new DuplicateError())
         else if(err.status == 0)
          return Observable.throw(new ServerError())
        else 
          return Observable.throw(new AppError(err))
    })
  }

  getValue(page)
  {debugger;
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", '*');
    headers.append('Authorization','054a687c5755e22ee8ff91303d538540aaacfaa8'); 
    headers.append('content-type','application/json')
    headers.append('guestEmail',localStorage.getItem('guestEmail'));
    headers.append('email',localStorage.getItem('email')); 
    console.log(`${Url.url}/${page}/`)
    return this.http.get(`${Url.url}/${page}/`, {headers: headers})
    .map(res => res.json())
    .catch((err)=>{
        if(err.status == 404)
         return  Observable.throw(new NotFoundError()) 
       
        else 
          return Observable.throw(new AppError(err))
    })
  }

  putValue(value,page)
  { debugger;
    let headers = new Headers();
    headers.append('X-CSRFToken','bYe1DbntAm5CLtQ8WE5x0vQNuEqPSG9cpUU8mZXnSz2kcRt5wshVBJFicU1jHbNw'); 
    return this.http.put(`${Url.url}/${page}`,value, {headers: headers})
    .map(res => res.json())
    .catch((err)=>{
        if(err.status == 404)
         return  Observable.throw(new NotFoundError()) 
       
        else 
          return Observable.throw(new AppError(err))
    })
  }
}
