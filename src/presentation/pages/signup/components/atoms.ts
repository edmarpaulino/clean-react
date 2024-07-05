import { atom } from 'recoil'

export const signUpState = atom({
  key: 'signUpState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: null,
    emailError: null,
    passwordError: null,
    passwordConfirmationError: null,
    mainError: null
  }
})
