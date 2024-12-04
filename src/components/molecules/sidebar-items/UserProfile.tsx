import { formatRoleDisplay } from '@/utils/format';

interface UserProfileProps {
  displayName: string;
  role: string;
}

export default function UserProfile({ displayName, role }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center p-6 border-b">
      <h2 className="text-lg font-semibold">{displayName}</h2>
      <p className="text-sm text-gray-500">{formatRoleDisplay(role)}</p>
    </div>
  );
}
