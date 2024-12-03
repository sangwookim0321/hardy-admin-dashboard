'use client';

import { AuthForm } from '@/components/molecules/auth-form/AuthForm';
import { signIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error, message } = await signIn(email, password);
      
      if (error) {
        toast.error(message || '로그인에 실패했습니다.');
        return;
      }

      if (data?.session) {
        toast.success('로그인 성공!');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다.');
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
