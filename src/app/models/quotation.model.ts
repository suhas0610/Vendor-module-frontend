export interface Quotation {
  id: string;
  mappingId: string; // trainer submission id
  requestId: string;
  vendorId: string;
  baseCost: number;
  travelExpenses: number;
  accommodationExpenses: number;
  totalCost: number;
  createdAt: string;
}
