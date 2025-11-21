"use client";

import { useSignInTokenLogin } from "@/hooks/useSignInTokenLogin";

const SignInTokenHandler = () => {
  useSignInTokenLogin();
  return null;
};

export default SignInTokenHandler;
