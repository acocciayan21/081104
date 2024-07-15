document.addEventListener("DOMContentLoaded", function() {
  const signUpButton = document.querySelector(".toggle-sign-up-button");
  const signUpForm = document.querySelector('.sign-up');
  const toggleContainer = document.querySelector(".toggle-container");
  const toggleSignUpContent = document.querySelector('.toggle-sign-up');
  const toggleSignInContent = document.querySelector('.toggle-sign-in');
  const signInForm = document.querySelector(".sign-in");
  const signInButton = document.querySelector(".toggle-sign-in-button");

  signUpButton.addEventListener("click", () => {
    toggleContainer.classList.add('toggle-right');
    toggleSignUpContent.classList.add('toggle-right-content');
    toggleSignInContent.classList.add('toggle-left-content');
    signInForm.classList.add('toggle-right-content-form');
    signUpForm.classList.add('toggle-left-content-form');

  });

  signInButton.addEventListener("click", () => {
    toggleContainer.classList.remove('toggle-right');
    toggleSignUpContent.classList.remove('toggle-right-content');
    toggleSignInContent.classList.remove('toggle-left-content');
    signInForm.classList.remove('toggle-right-content-form');
    signUpForm.classList.remove('toggle-left-content-form');

    
  });
});
