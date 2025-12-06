'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';
import {
  checkAuthStatus,
  redirectToLogin,
  handleAuthCallback,
} from '@/shared/utils/auth';

interface MemberAuthWrapperProps {
  children: ReactNode;
}

export default function MemberAuthWrapper({
  children,
}: MemberAuthWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    async function verifyAuth() {
      const tokenSaved = handleAuthCallback();
      if (tokenSaved) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      const status = await checkAuthStatus();
      if (!status.authenticated) {
        redirectToLogin();
        return;
      }

      setIsLoading(false);
    }

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">認証状態を確認中...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
