'use client';

import { newVerification } from '@/server/actions/new-verification';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { AuthCard } from './Auth-Card';
import { toast } from 'sonner';
const VerificationForm = () => {
  const token = useSearchParams().get('token');
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerification = useCallback(() => {
    if (success || error) return;
    if (!token) {
      toast.error('No token provided');
      return setError('No token provided');
    }
    newVerification(token).then((res) => {
      if (res.error) {
        toast.error(res.error);
        return setError('Invalid token');
      }
      toast.success('Email verified successfully');
      return setSuccess('Email verified successfully');
    });
  }, []);

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <div className="mt-20 flex h-full items-center justify-center">
      <AuthCard
        cardTitle="Email verification"
        backButtonLabel="Back to login"
        backButtonHref="/login"
      >
        <div className="flex w-full flex-col items-center">
          {!success && !error ? 'Verifying...' : null}
        </div>
      </AuthCard>
    </div>
  );
};

export default VerificationForm;
