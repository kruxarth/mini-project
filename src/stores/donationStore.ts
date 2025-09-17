// src/stores/donationStore.ts
import { create } from 'zustand'
import type { Donation, UserStats } from '../types'
import { mockDonations, calculateUserStats } from '../data/mockData'

interface DonationState {
  donations: Donation[]
  loading: boolean
  error: string | null
  
  // Computed values
  stats: UserStats
  recentDonations: Donation[]
  activeDonations: Donation[]
  
  // Actions
  fetchDonations: () => Promise<void>
  addDonation: (donation: Omit<Donation, 'id' | 'createdAt'>) => void
  updateDonationStatus: (id: string, status: Donation['status']) => void
  deleteDonation: (id: string) => void
  
  // Filters
  filterByStatus: (status: Donation['status']) => Donation[]
  getDonationById: (id: string) => Donation | undefined
}

export const useDonationStore = create<DonationState>((set, get) => ({
  donations: mockDonations,
  loading: false,
  error: null,
  
  // Computed values - recalculated whenever donations change
  get stats() {
    return calculateUserStats(get().donations)
  },
  
  get recentDonations() {
    return get().donations
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  },
  
  get activeDonations() {
    return get().donations.filter(d => 
      ['pending', 'scheduled', 'picked_up', 'in_transit'].includes(d.status)
    )
  },

  // Simulate API call
  fetchDonations: async () => {
    set({ loading: true, error: null })
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In real app, this would be an API call
      // const donations = await fetch('/api/donations').then(r => r.json())
      
      set({ donations: mockDonations, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch donations', loading: false })
    }
  },

  addDonation: (donationData) => set((state) => {
    const newDonation: Donation = {
      ...donationData,
      id: `don_${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    
    return {
      donations: [...state.donations, newDonation]
    }
  }),

  updateDonationStatus: (id, status) => set((state) => ({
    donations: state.donations.map(donation =>
      donation.id === id 
        ? { 
            ...donation, 
            status,
            completedAt: status === 'delivered' ? new Date().toISOString() : donation.completedAt
          }
        : donation
    )
  })),

  deleteDonation: (id) => set((state) => ({
    donations: state.donations.filter(donation => donation.id !== id)
  })),

  // Utility functions
  filterByStatus: (status) => {
    return get().donations.filter(donation => donation.status === status)
  },

  getDonationById: (id) => {
    return get().donations.find(donation => donation.id === id)
  }
}))


