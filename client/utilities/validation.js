export const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePasswords = (pass1, pass2) => {
  return pass1 === pass2;
};
export const checkPass = pass => {
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(pass);
};

export const formValidator = ({ email, password, retyped }) => {
  if (validateEmail(email)) {
    //continue if passed
    if (checkPass(password)) {
      //continue if passed
      if (validatePasswords(password, retyped)) {
        return { result: true };
      } else {
        return { result: false, code: 3 };
      }
    } else {
      return { result: false, code: 2 };
    }
  } else {
    return { result: false, code: 1 };
  }
};
