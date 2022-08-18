import { atom } from 'jotai';
import Cookies from 'js-cookie';

export const tokenStatusAtom = atom(Cookies.get('token') !== undefined ? true : false)