export interface Vendor {
  id: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: 'ACTIVE'|'INACTIVE';
  createdAt: string;
  updatedAt?: string;
}
