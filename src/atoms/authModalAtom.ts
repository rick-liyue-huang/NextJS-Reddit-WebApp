
import {atom} from "recoil";


export interface AuthModalState {
	open: boolean;
	view: 'login' | 'register' | 'resetPassword'
}

export const defaultAuthModalState: AuthModalState = {
	open: false,
	view: 'login'
};

/**
 * @define the authModalAtom used to define the auth modal dialog from authButtons
 */
export const authModalState = atom<AuthModalState>({
	key: 'authModalState',
	default: defaultAuthModalState
});
