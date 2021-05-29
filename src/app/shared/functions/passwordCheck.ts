export const passwordConfirming = (form: any) => {
  const password = form.get('password').value;
  const confirmation = form.get('confirmPassword').value;
  const sameSame = password === confirmation;
  const gotSize = password.length > 0 && confirmation.length > 0;
  const valid = sameSame && gotSize;
  return valid ? null : { notSame: true };
};
