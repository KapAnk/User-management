import type { User } from "../types/User";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
};

export default function UserTable({ users, onEdit }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>UUID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} onClick={() => onEdit(u)}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.surname}</td>
            <td>{u.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}