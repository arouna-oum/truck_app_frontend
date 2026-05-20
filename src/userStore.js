import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

// Acts exactly like an Angular BehaviorSubject

export let userSubject = new BehaviorSubject(null);
const API_URL = import.meta.env.VITE_API_URL;
export const userService = {
    setUser: (user) => userSubject.next(user),
    getUser: () => userSubject.asObservable()
};
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

    function intToRGB(i) {
        const c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
        return "00000".substring(0, 6 - c.length) + c;
    }

export function setUserLogo(finalForm) {
    if(finalForm?.username && (finalForm?.profile_picture==null) && (finalForm?.google_picture_url==null)){
        const initialLetter = finalForm?.username.charAt(0).toUpperCase();
        console.log("Initial letter is --- " + initialLetter);
        // Hash the username to generate a unique identifier
        const hashCodes = hashCode(finalForm?.username);
        // Convert the hash code into a color
        const color = intToRGB(hashCodes);
        console.log("the color is " + color + " and hash code is " + hashCode);
        finalForm.profile_picture = `https://placehold.co/50x50/${color}/white?text=${initialLetter}`;
        // this.user.profile_picture = `https://via.placeholder.com/200/${color}/ffffff?text=${initialLetter}`;
        console.log("Just Send it well and the vals are ");
    }else{
        finalForm.profile_picture = API_URL+finalForm.profile_picture;
        console.log('The value of profile picture is given as === ', finalForm.profile_picture);
    }
    localStorage.setItem('user', JSON.stringify(finalForm));
}

    export const isTokenExpired = () => {
        const user = localStorage.getItem("user");

        if (!user) return true;

        try {
            const parsed = JSON.parse(user);
            const access = parsed?.access;

            if (!access) return true;

            const decoded = jwtDecode(access);

            return decoded.exp < Date.now() / 1000;

        } catch {
            return true;
        }
    };

    export const refreshToken = async () => {
        const user = localStorage.getItem("user");

        if (!user) return null;

        const parsed = JSON.parse(user);

        try {
            const res = await axios.post(
                API_URL + "api/token/refresh/",
                { refresh: parsed.refresh }
            );

            const updatedUser = {
                ...parsed,
                access: res.data.access
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));

            return res.data.access;

        } catch (error) {

            localStorage.clear();

            window.location.href = "/login";

            return null;
        }
    };

    export const controlOnrefresh = async () => {
        const user = localStorage.getItem("user");

        if (!user) return;

        const parsed = JSON.parse(user);

        const expired = isTokenExpired();

        if (expired) {
            console.log("Access token expired → refreshing");

            const newAccess = await refreshToken();

            return newAccess;
        }

        return parsed.access;
    };