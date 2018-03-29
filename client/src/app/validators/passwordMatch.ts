import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        debugger;
       let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            AC.get('confirmPassword').setErrors( null )
        }
    }
}