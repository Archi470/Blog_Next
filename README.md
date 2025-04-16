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

## 🚀 Features

- Admin login authentication (Firebase)
- Create, Read, Update, Delete (CRUD) blog posts
- Protected admin dashboard
- Firebase Firestore integration
- Responsive UI with Tailwind CSS
- Hosted on Vercel

---

## 🔐 Admin Credentials

> These are test credentials for demo purposes:

- **Email**: `admin@gmail.com`  
- **Password**: `admin123`

---

## ⚙️ Tech Stack

- [Next.js](https://nextjs.org/)
- [Firebase Auth & Firestore](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)

---

## 🛠️ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. Install Dependencies
Run the following command to install the necessary dependencies:

bash
Copy code
npm install

3. Set Up Firebase
Go to Firebase Console and create a new project.

Enable Authentication → Email/Password sign-in method.

Go to Firestore Database and create a new database in test mode.

Go to Project Settings → General → Your apps, click </> (Web app), and register your app to get your Firebase config.

4. Add Firebase Config

Create a file called firebaseConfig.js in the root or src directory:

bash
Copy code
touch firebaseConfig.js
Add the following Firebase configuration to the file:

js
Copy code
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

5. Ignore Firebase Config in Git
Add firebaseConfig.js to .gitignore to keep your credentials secure:

bash
Copy code
echo "firebaseConfig.js" >> .gitignore

6. Add Environment Variables (Optional)
For better security and scalability, it's recommended to use environment variables for Firebase credentials. You can create a .env.local file at the root of your project and add the following:

env
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MSG_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
Then, update your firebaseConfig.js file to use these variables:

js
Copy code
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

7. Run the Development Server
Now that everything is set up, run the development server:

bash
Copy code
npm run dev
This will start the app at http://localhost:3000.

🔐 Firebase Security Rules (Recommended)
For better security and access control, set the following Firestore security rules:

js
Copy code
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogPosts/{postId} {
      allow read: if true; // public read
      allow write: if request.auth != null; // only authenticated users can write
    }
  }
}
This ensures that only authenticated users can perform write operations on blog posts.

🌐 Deployment
To deploy the app on Vercel, follow these steps:

Push your code to GitHub.

Go to Vercel and log in.

Click on "New Project" and import your GitHub repository.

Set up any required environment variables if you are using .env.local.

Click on Deploy and Vercel will automatically build and deploy your app.

Once deployed, you’ll be able to access your app through the provided Vercel URL.

📬 Contact
For issues, improvements, or suggestions, feel free to open an issue on the GitHub repository or reach out through the contact methods on my profile. Happy coding! 💻

---