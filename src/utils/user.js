export const checkPasswordStrength = (password) => {
  const length = password.length;
  if (length < 8) {
    return false;
  }
  let numbers = false;
  let letters = false;
  for (let i = 0; i < length; i++) {
    if (!isNaN(password[i])) {
      numbers = true;
    } else if (isNaN(password[i])) {
      letters = true;
    }
    if (numbers && letters) {
      return true;
    }
  }
  return false;
};

export const getCurrency = async () => {
  const response = await fetch(
    `https://ipapi.co/currency/?key=${process.env.REACT_APP_IPAPI_KEY}`
  )
    .then((res) => res.text())
    .catch((err) => console.log(err));

  return response;
};
