export const validateEmail = email => {
  //verifiying email
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePasswords = (pass1, pass2) => {
  //verifying passwords match
  return pass1 === pass2;
};
export const checkPass = pass => {
  //verifying password is at least 8 char long, has at least one uppercase/lowercase letter, and one special character
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(pass);
};

export const formValidator = ({ email, password, retyped }) => {
  //this combines the top three functions and is called when a user is creating an account, and returns a corresponding error code if there is an issue.
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
