
export interface User {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
}

export interface DonationItem {
  name: string
  quantity: number
  unit: string
  category: 'perishable' | 'non-perishable'
  expiryDate?: string
}

export interface Donation {
  id: string
  donorId: string
  status: 'pending' | 'scheduled' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled'
  items: DonationItem[]
  pickupAddress: string
  recipientOrg?: string
  scheduledTime?: string
  createdAt: string
  completedAt?: string
  estimatedMeals: number
  co2Saved: number
}

export interface UserStats {
  totalDonations: number
  activeDonations: number
  completedDonations: number
  totalMealsProvided: number
  totalCO2Saved: number
  currentMonth: {
    donations: number
    meals: number
  }
}

