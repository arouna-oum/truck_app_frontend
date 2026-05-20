import { BehaviorSubject } from 'rxjs';

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