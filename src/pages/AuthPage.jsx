// src/pages/AuthPage.jsx
import { SignIn, SignUp } from '@clerk/clerk-react';

const AuthPage = () => {
  return (
    <div>
      <h1>Authentication</h1>
      <SignIn path="/sign-in" routing="path" />
      <SignUp path="/sign-up" routing="path" />
    </div>
  );
};

export default AuthPage;
