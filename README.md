# 📝 Next.js Blog App

This ReadME.md includes

- Firebase configuration setup
- Firebase Firestore security rules
- Steps for local setup and deployment on Vercel
- Admin credentials
- Optional environment variables setup for better security

A full-stack Blog Application built with **Next.js**, **Firebase**, and **Tailwind CSS**.  
It includes admin login, post creation, editing, deletion, and Firebase authentication.

---

## Features

- Admin login authentication (Firebase)
- Create, Read, Update, Delete (CRUD) blog posts
- Protected admin dashboard
- Firebase Firestore integration
- Responsive UI with Tailwind CSS
- Hosted on Vercel

---

## Admin Credentials

> These are test credentials for demo purposes:

- **Email**: `admin@gmail.com`  
- **Password**: `admin123`

---

##  Tech Stack

- [Next.js](https://nextjs.org/)
- [Firebase Auth & Firestore](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)

---

## Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Archi470/Blog_Next.git
   cd Blog_Next

2. **Install Dependencies**
    
    Run the following command to install the necessary     dependencies:
    ```bash    
    npm install

3. **Set Up Firebase**

    - Go to Firebase Console and create a new project.
    - Enable Authentication → Email/Password sign-in method.
    - Go to Firestore Database and create a new database in test mode.
    - Go to Project Settings → General → Your apps, click </> (Web app), and register your app to get your Firebase config.

4. **Add Firebase Config**

- Create a file called firebaseConfig.js in the root or src directory:

    
    Add the following Firebase configuration to the file:
     ```bash
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MSG_ID",
        appId: "YOUR_APP_ID",
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    Note: Replace the placeholders (YOUR_API_KEY, YOUR_AUTH_DOMAIN, etc.) with your actual Firebase credentials.

5. **Run the Project**
   
   To run the development server, use:

      ```bash
      npm run dev
Now your app should be live at: http://localhost:3000
   
## Contact
For issues, improvements, or suggestions, feel free to open an issue on the GitHub repository or reach out through the contact methods on my profile. Happy coding! 

---
