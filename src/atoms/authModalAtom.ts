
import {atom} from "recoil";

/**
 *@define create the modal state format
 */
export interface AuthModalState {
	open: boolean;
	view: 'login' | 'register' | 'resetPassword'
}

/**
 * @define config the default value
 */
const defaultAuthModalState: AuthModalState = {
	open: false,
	view: 'login'
};


/**
 * @define create auth modal state to match the auth modal form
 */
export const authModalState = atom<AuthModalState>({
	key: 'authModalState',
	default: defaultAuthModalState
});


