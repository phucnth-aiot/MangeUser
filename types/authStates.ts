import { UserInterface as User } from "./user";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}