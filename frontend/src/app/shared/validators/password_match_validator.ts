import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName:string ,confirmPasswordControlName:string) => {

      const validator = (form: AbstractControl) => {

        const passwordControl =  form.get(passwordControlName);
        const confirmPasswordControl =  form.get(confirmPasswordControlName);

        if(!passwordControl || !confirmPasswordControl) return; //FOR PASSWORD CONTROL IS UNDEFINED:IF NULL

        if(passwordControl.value !== confirmPasswordControl.value){
          confirmPasswordControl.setErrors({notMatch: true});
        }else{
          const errors = confirmPasswordControl.errors;
          if(!errors) return;

          delete errors.notMatch; //DELETE USE FOR DELETING THE PROPERTY FROM AN OBJECT.
          confirmPasswordControl.setErrors(errors);
        }
      }
      return validator;
    }
