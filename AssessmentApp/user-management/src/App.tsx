import { useEffect, useState } from "react";
import type { User } from "./types/User";
import { getUsers, createUser, updateUser } from "./api/userApi";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
  
      // Optionally: Show a user-friendly message or set an error state
      // setError('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (user: User) => {
    if (user.id) {
      await updateUser(user.id, user);
    } else {
      await createUser(user);
    }
    setSelectedUser(null);
    fetchUsers();
  };

  return (
    <div className="container">
      <div className="table-section">
        <UserTable users={users} onEdit={setSelectedUser} />
      </div>
      <div className="form-section">
        <UserForm user={selectedUser} onSubmit={handleSubmit} onCancel={() => setSelectedUser(null)} />
      </div>
    </div>
  );
}

export default App;