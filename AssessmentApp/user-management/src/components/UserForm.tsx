import { useState, useEffect } from "react";
import type { User } from "../types/User";

type Props = {
  user: User | null;
  onSubmit: (user: User) => void;
  onCancel: () => void;
};

export default function UserForm({ user, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<User>({ name: "", surname: "", email: "", company: "", jobTitle: "" });

  useEffect(() => {
    if (user) setForm(user);
    else setForm({ name: "", surname: "", email: "", company: "", jobTitle: "" });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.surname || !form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      alert("Please fill all fields correctly.");
      return;
    }
    onSubmit(form);
  };

  return (
    <div>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="surname" value={form.surname} onChange={handleChange} placeholder="Surname" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="company" value={form.company} onChange={handleChange} placeholder="Company" />
      <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="Job Title" />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}