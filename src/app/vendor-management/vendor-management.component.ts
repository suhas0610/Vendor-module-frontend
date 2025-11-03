import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

interface Vendor {
  vendorId: number;
  vendorName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css']
})
export class VendorManagementComponent implements OnInit {
  vendors: Vendor[] = [];
  formVisible = false;
  editingVendor: Vendor | null = null;
  model: Partial<Vendor> = {
    status: 'ACTIVE'
  };
  displayedColumns: string[] = ['vendorName', 'contactPerson', 'contactEmail', 'contactPhone', 'address', 'status', 'actions'];

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.apiService.getVendors().subscribe({
      next: (data: Vendor[]) => {
        console.log('Received vendors:', data);
        this.vendors = data;
      },
      error: (error: any) => {
        console.error('Error loading vendors:', error);
        this.toastService.error('Error loading vendors: ' + (error.error?.message || error.message || 'Unknown error'));
      }
    });
  }

  openForm(vendor?: Vendor): void {
    this.formVisible = true;
    if (vendor) {
      this.editingVendor = vendor;
      this.model = { ...vendor };
    } else {
      this.editingVendor = null;
      this.model = { status: 'ACTIVE' };
    }
  }

  closeForm(): void {
    this.formVisible = false;
    this.editingVendor = null;
    this.model = { status: 'ACTIVE' };
  }

  save(): void {
    const now = new Date().toISOString();
    const vendorData = {
      vendorName: this.model.vendorName || '',
      contactPerson: this.model.contactPerson || '',
      contactEmail: this.model.contactEmail || '',
      contactPhone: this.model.contactPhone || '',
      address: this.model.address || '',
      status: this.model.status || 'ACTIVE',
      createdAt: now,
      updatedAt: now
    };

    if (this.editingVendor) {
      this.apiService.updateVendor(this.editingVendor.vendorId.toString(), {
        ...vendorData,
        vendorId: this.editingVendor.vendorId
      }).subscribe({
        next: () => {
          this.toastService.success('Vendor updated successfully');
          this.loadVendors();
          this.closeForm();
        },
        error: (error: any) => {
          this.toastService.error('Error updating vendor: ' + error.message);
        }
      });
    } else {
      this.apiService.createVendor(vendorData).subscribe({
        next: () => {
          this.toastService.success('Vendor created successfully');
          this.loadVendors();
          this.closeForm();
        },
        error: (error: any) => {
          this.toastService.error('Error creating vendor: ' + error.message);
        }
      });
    }
  }

  deactivate(vendorId: number): void {
    const vendor = this.vendors.find(v => v.vendorId === vendorId);
    if (vendor) {
      if (confirm('Are you sure you want to deactivate this vendor? This action cannot be undone.')) {
        this.apiService.deleteVendor(vendorId.toString()).subscribe({
          next: () => {
            this.toastService.success('Vendor deactivated successfully');
            this.loadVendors();
          },
          error: (error: any) => {
            this.toastService.error('Error deactivating vendor: ' + error.message);
          }
        });
      }
    }
  }

  deleteVendor(vendorId: number): void {
    if (confirm('Are you sure you want to delete this vendor? This action cannot be undone.')) {
      this.apiService.deleteVendor(vendorId.toString()).subscribe({
        next: () => {
          this.toastService.success('Vendor deleted successfully');
          this.loadVendors();
        },
        error: (error: any) => {
          this.toastService.error('Error deleting vendor: ' + error.message);
        }
      });
    }
  }
}
