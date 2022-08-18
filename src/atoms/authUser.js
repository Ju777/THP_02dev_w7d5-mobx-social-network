import { atom } from 'jotai';
import Cookies from 'js-cookie';

// export const authUserAtom = atom(null);
export const authUserAtom = atom(Cookies.get('authUser') !== undefined ? JSON.parse(Cookies.get('authUser')) : null)