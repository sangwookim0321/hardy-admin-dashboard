interface UserProfileProps {
  displayName: string;
  role: string;
}

export default function UserProfile({ displayName, role }: UserProfileProps) {
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'super-admin':
        return 'Super Admin';
      case 'admin':
        return 'Admin';
      default:
        return 'Guest';
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border-b">
      <h2 className="text-lg font-semibold">{displayName}</h2>
      <p className="text-sm text-gray-500">{getRoleDisplay(role)}</p>
    </div>
  );
}
