import axios from "axios";
import type { User } from "../types/User";

const API_BASE = "http://localhost:5093/api";

const api = axios.create({
    baseURL: API_BASE, 
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  
  // Endpoints
  export const getUsers = async () => api.get<User[]>("/users");
  
  export const createUser = async (user: User) => api.post<User>("/users", user);
  
  export const updateUser = async (id: string, user: User) => api.put<User>(`/users/${id}`, user);
  
  export const deleteUser = async (id: string) => api.delete(`/users/${id}`);