import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Vendor } from '../models/vendor.model';
import { TrainingRequest } from '../models/training-request.model';
import { TrainerSubmission } from '../models/trainer-submission.model';
import { Quotation } from '../models/quotation.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private key = 'training-portal-v1';

  private loadState(): any {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? JSON.parse(raw) : { vendors: [], requests: [], submissions: [], quotations: [] };
    } catch {
      return { vendors: [], requests: [], submissions: [], quotations: [] };
    }
  }

  private saveState(state: any) {
    localStorage.setItem(this.key, JSON.stringify(state));
  }

  // Vendor CRUD
  getVendors(): Vendor[] {
    return this.loadState().vendors;
  }
  upsertVendor(v: Partial<Vendor>): Vendor {
    const s = this.loadState();
    if (!v.id) {
      const newV: Vendor = {
        id: uuidv4(),
        name: v.name || 'Unnamed Vendor',
        contactPerson: v.contactPerson || '',
        email: v.email || '',
        phone: v.phone || '',
        address: v.address || '',
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      };
      s.vendors.unshift(newV);
      this.saveState(s);
      return newV;
    } else {
      const idx = s.vendors.findIndex((x:any)=> x.id === v.id);
      if (idx >= 0) {
        s.vendors[idx] = { ...s.vendors[idx], ...v, updatedAt: new Date().toISOString() };
        this.saveState(s);
        return s.vendors[idx];
      }
    }
    return v as Vendor;
  }
  deactivateVendor(id: string) {
    const s = this.loadState();
    const v = s.vendors.find((x:any) => x.id === id);
    if (v) { v.status = 'INACTIVE'; v.updatedAt = new Date().toISOString(); this.saveState(s); }
  }

  // Training requests
  getRequests(): TrainingRequest[] { return this.loadState().requests; }
  createRequest(payload: Partial<TrainingRequest>) {
    const s = this.loadState();
    const newR: TrainingRequest = {
      id: payload.id || uuidv4(),
      courseName: payload.courseName || 'Untitled',
      duration: payload.duration || '',
      traineeCount: payload.traineeCount || 0,
      status: 'CREATED',
      createdAt: new Date().toISOString()
    };
    s.requests.unshift(newR);
    this.saveState(s);
    return newR;
  }
  publishRequest(id: string) {
    const s = this.loadState();
    const r = s.requests.find((x:any)=>x.id===id);
    if (r) { r.status = 'PUBLISHED'; r.updatedAt = new Date().toISOString(); this.saveState(s); }
  }

  // Trainer submissions
  getSubmissions(): TrainerSubmission[] { return this.loadState().submissions; }
  submitTrainer(payload: Partial<TrainerSubmission>) {
    const s = this.loadState();
    const existing = s.submissions.find((x:any)=> x.requestId === payload.requestId && x.vendorId === payload.vendorId);
    if (existing) { throw new Error('Already submitted for this request'); }
    const newS: TrainerSubmission = {
      id: uuidv4(),
      requestId: payload.requestId!,
      vendorId: payload.vendorId!,
      vendorName: payload.vendorName || '',
      trainerName: payload.trainerName || 'Unnamed',
      email: payload.email || '',
      phone: payload.phone || '',
      experience: payload.experience || 0,
      expertise: payload.expertise || '',
      certifications: payload.certifications || '',
      status: 'SUBMITTED',
      createdAt: new Date().toISOString()
    };
    s.submissions.unshift(newS);
    this.saveState(s);
    return newS;
  }
  updateSubmissionStatus(id:string, status: TrainerSubmission['status']){
    const s = this.loadState();
    const item = s.submissions.find((x:any)=>x.id===id);
    if (item){ item.status = status; item.updatedAt = new Date().toISOString(); this.saveState(s); }
  }

  // Quotations
  getQuotations(): Quotation[] { return this.loadState().quotations; }
  submitQuotation(payload: Partial<Quotation>) {
    const s = this.loadState();
    const exists = s.quotations.find((q:any)=> q.mappingId === payload.mappingId);
    if (exists) { throw new Error('Quotation exists'); }
    const total = (payload.baseCost || 0) + (payload.travelExpenses || 0) + (payload.accommodationExpenses || 0);
    const newQ: Quotation = {
      id: uuidv4(),
      mappingId: payload.mappingId!,
      requestId: payload.requestId!,
      vendorId: payload.vendorId!,
      baseCost: payload.baseCost||0,
      travelExpenses: payload.travelExpenses||0,
      accommodationExpenses: payload.accommodationExpenses||0,
      totalCost: total,
      createdAt: new Date().toISOString()
    };
    s.quotations.unshift(newQ);
    this.saveState(s);
    return newQ;
  }
}
