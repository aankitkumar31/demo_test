
import { CommonService } from '../common/common.service';
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


export class RegisterService extends CommonService {
    
    constructor(http:Http) {
      super(http);
    }

    postregister(value){
      return super.postValue(value, 'register');
    }
    
}
