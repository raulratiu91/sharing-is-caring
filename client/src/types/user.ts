export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  userType: "elder" | "volunteer";
  profilePicture?: string;
}
