'use client';

import { AuthForm } from '@/components/molecules/auth-form/AuthForm';
import { signIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        toast.error('Login failed. Please check your credentials.');
        return;
      }

      if (data?.user) {
        toast.success('Login successful!');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen bg-[#000000] grid place-items-center">
      <AuthForm onSubmit={handleLogin} isLoading={isLoading} />
    </main>
  );
}
