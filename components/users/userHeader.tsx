type Props = {
  totalUsers: number;
  headerName: string;
  description: string;
};

export default function UserHeader({ totalUsers, headerName, description }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{headerName}</h1>
      <p className="text-gray-600">
         {description} {totalUsers}
      </p>
    </div>
  );
}
