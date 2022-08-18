import { atom } from 'recoil';

export interface AuthModalState {
  open: boolean;
  view: 'login' | 'signup' | 'resetPassword';
}

const defaultAuthModalState: AuthModalState = {
  open: false,
  view: 'login',
};

export const authModalState = atom({
  key: 'authModalState',
  default: defaultAuthModalState,
});
