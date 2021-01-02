import { FormGroup } from "@angular/forms";

export function checkPasswords() {
  return (group: FormGroup) => {
    let password = group.controls['password'];
    let passwordConfirm = group.controls['confirmPassword'];

    if (password.value !== passwordConfirm.value && password.value !== undefined && password.value.trim() != '') {
      return passwordConfirm.setErrors({ notEquivalent: true });
    } else {
      return passwordConfirm.setErrors(null);
    }
  };
}
