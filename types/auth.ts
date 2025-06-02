export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  isAdmin?: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}