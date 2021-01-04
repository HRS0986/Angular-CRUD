import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


export function checkPasswords() {
  return (group: AbstractControl): ValidationErrors | null => {
    let password:any = group.get('password');
    let passwordConfirm:any = group.get('confirmPassword');

    if (password.value !== passwordConfirm.value && password.value !== undefined) {
      return passwordConfirm.setErrors({ notEquivalent: true });
    } else {
      return null;
    }
  };
}

// /** A hero's name can't match the hero's alter ego */
// export const identityRevealedValidator = (control: FormGroup): ValidationErrors | null => {
//   const name = control.get('name');
//   const alterEgo = control.get('alterEgo');

//   return name && alterEgo && name.value === alterEgo.value ? { identityRevealed: true } : null;
// };

// export const checkPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');

//   if (password !== confirmPassword && password !== undefined) {
//     return confirmPassword.setErrors({ notEquivalent: true });
//   } else {
//     return confirmPassword.setErrors(null);
  // }

// }