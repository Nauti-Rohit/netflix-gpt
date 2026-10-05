export const checkValidData = (fullName, email, password, isSignUp) => {
  if (isSignUp && fullName.trim().length < 2) {
    return "Please enter a valid name.";
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isEmailValid) {
    return "Please enter a valid email address.";
  }

  if (!password) {
    return "Please enter a password.";
  }

  if (isSignUp) {
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password,
      );

    if (!isPasswordValid) {
      return "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.";
    }
  }

  return null;
};
