import { auth, db } from './firebaseConfig'; 
import { signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();

// 1. Trigger the redirect to Google
export const handleGoogleSignIn = async () => {
  try {
    console.log("🚀 Starting Google Redirect...");
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("🛑 Error starting Google Redirect:", error);
  }
};

// 2. The Bulletproof Listener & Handshake Catcher
export const listenForAuthChanges = (callback) => {
  console.log("🛡️ Security Listener activated. Checking for VIP token...");
  
  // Force Firebase to catch the VIP token from the URL immediately upon return
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        console.log("✅ REDIRECT CAUGHT! User:", result.user.email);
      }
    })
    .catch((err) => console.error("🛑 Handshake error:", err));

  // Constantly watch to see if they are logged in
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("👤 User is authenticated. Checking database profile...");
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.log("🌱 Brand new user! Creating V2.0 profile...");
        const firstName = user.displayName ? user.displayName.split(' ')[0] : 'Seeker';

        // Create their new profile with the V2.0 Compass requirements
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          firstName: firstName,
          authProvider: 'google',
          onboardingComplete: false, // Traps them on the Origin screen
          astrologicalData: {
            dateOfBirth: null,
            timeOfBirth: null,
            cityOfBirth: null,
            northNodeSign: null
          },
          createdAt: new Date().toISOString()
        });
        
        callback({ isNewUser: true, firstName: firstName, uid: user.uid });
        
      } else {
        console.log("👋 Returning user found!");
        const userData = userDocSnap.data();
        callback({ 
          isNewUser: false, 
          onboardingComplete: userData.onboardingComplete,
          firstName: userData.firstName,
          uid: user.uid
        });
      }
    } else {
      console.log("👻 No user is currently logged in.");
      callback(null);
    }
  });
  
};
// 3. SAVE ONBOARDING DATA TO FIRESTORE
export const completeUserOnboarding = async (uid, userData) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      ...userData,
      onboardingComplete: true // This breaks the loop!
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving onboarding:", error);
    return false;
  }
};