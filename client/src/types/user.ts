export interface User {
  _id: string;
  id?: string; // Legacy compatibility
  name: string;
  email: string;
  phone?: string;
  address: string;
  bio?: string; // Optional bio field
  userType: "elder" | "volunteer" | "admin";
  profilePicture?: string;
  avatar?: string; // Backend uses 'avatar'
  isEmailVerified: boolean;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  location?: {
    address: string;
    coordinates?: {
      type: 'Point';
      coordinates: [number, number];
    };
  };
}
