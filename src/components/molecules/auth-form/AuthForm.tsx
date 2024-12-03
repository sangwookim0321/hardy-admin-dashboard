import { MdEmail, MdLock } from 'react-icons/md';
import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
import { Form } from '@/components/atoms/form/Form';
import { FlexBox } from '@/components/atoms/flex-box/FlexBox';
import { useState } from 'react';
import Image from 'next/image';

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
}

export const AuthForm = ({ onSubmit, isLoading = false }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <FlexBox direction="col" items="center" gap={8}>
      <Image
        src="/hardy-admin-logo.svg"
        alt="Hardy Admin Logo"
        width={120}
        height={120}
        priority
        className='mb-4'
      />
      <FlexBox 
        direction="col" 
        items="center"
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg mx-4"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Hardy Admin Dashboard
        </h1>
        <Form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input
            type="email"
            placeholder="이메일"
            icon={<MdEmail size={20} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="비밀번호"
            icon={<MdLock size={20} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            로그인
          </Button>
        </Form>
      </FlexBox>
    </FlexBox>
  );
};
