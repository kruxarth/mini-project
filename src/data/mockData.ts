
// src/data/mockData.ts
import type { User, Donation, UserStats } from '../types'

export const mockUser: User = {
  id: 'user_1',
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1-555-0123',
  joinDate: '2023-08-15'
}

export const mockDonations: Donation[] = [
  {
    id: 'don_1',
    donorId: 'user_1',
    status: 'delivered',
    items: [
      { name: 'Fresh Vegetables', quantity: 5, unit: 'kg', category: 'perishable', expiryDate: '2024-03-20' },
      { name: 'Bread Loaves', quantity: 10, unit: 'pieces', category: 'perishable', expiryDate: '2024-03-18' }
    ],
    pickupAddress: '123 Main Street, Springfield, IL 62701',
    recipientOrg: 'Springfield Food Bank',
    scheduledTime: '2024-03-15T10:00:00Z',
    createdAt: '2024-03-14T15:30:00Z',
    completedAt: '2024-03-15T10:45:00Z',
    estimatedMeals: 15,
    co2Saved: 3.2
  },
  {
    id: 'don_2',
    donorId: 'user_1',
    status: 'in_transit',
    items: [
      { name: 'Canned Soup', quantity: 24, unit: 'cans', category: 'non-perishable' },
      { name: 'Rice', quantity: 2, unit: 'kg', category: 'non-perishable' }
    ],
    pickupAddress: '456 Oak Avenue, Springfield, IL 62702',
    recipientOrg: 'Community Kitchen',
    scheduledTime: '2024-03-16T14:00:00Z',
    createdAt: '2024-03-15T09:15:00Z',
    estimatedMeals: 20,
    co2Saved: 4.1
  },
  {
    id: 'don_3',
    donorId: 'user_1',
    status: 'scheduled',
    items: [
      { name: 'Pasta', quantity: 3, unit: 'boxes', category: 'non-perishable' },
      { name: 'Tomato Sauce', quantity: 6, unit: 'jars', category: 'non-perishable' }
    ],
    pickupAddress: '789 Pine Street, Springfield, IL 62703',
    scheduledTime: '2024-03-17T11:30:00Z',
    createdAt: '2024-03-16T08:45:00Z',
    estimatedMeals: 12,
    co2Saved: 2.8
  },
  // New September 2025 mock data
  {
    id: 'don_4',
    donorId: 'user_1',
    status: 'delivered',
    items: [
      { name: 'Milk Packets', quantity: 12, unit: 'liters', category: 'perishable', expiryDate: '2025-09-20' },
      { name: 'Eggs', quantity: 30, unit: 'pieces', category: 'perishable', expiryDate: '2025-09-18' }
    ],
    pickupAddress: '101 Elm Street, Springfield, IL 62704',
    recipientOrg: 'Hope Shelter',
    scheduledTime: '2025-09-10T09:00:00Z',
    createdAt: '2025-09-09T16:20:00Z',
    completedAt: '2025-09-10T09:45:00Z',
    estimatedMeals: 25,
    co2Saved: 5.6
  },
  {
    id: 'don_5',
    donorId: 'user_1',
    status: 'in_transit',
    items: [
      { name: 'Cereal Boxes', quantity: 8, unit: 'boxes', category: 'non-perishable' },
      { name: 'Powdered Milk', quantity: 4, unit: 'kg', category: 'non-perishable' }
    ],
    pickupAddress: '202 Maple Drive, Springfield, IL 62705',
    recipientOrg: 'Springfield Orphanage',
    scheduledTime: '2025-09-15T13:30:00Z',
    createdAt: '2025-09-14T10:10:00Z',
    estimatedMeals: 18,
    co2Saved: 3.9
  },
  {
    id: 'don_6',
    donorId: 'user_1',
    status: 'scheduled',
    items: [
      { name: 'Potatoes', quantity: 10, unit: 'kg', category: 'perishable', expiryDate: '2025-09-25' },
      { name: 'Onions', quantity: 8, unit: 'kg', category: 'perishable', expiryDate: '2025-09-28' }
    ],
    pickupAddress: '303 Cedar Lane, Springfield, IL 62706',
    recipientOrg: 'Neighborhood Pantry',
    scheduledTime: '2025-09-18T17:00:00Z',
    createdAt: '2025-09-17T11:45:00Z',
    estimatedMeals: 30,
    co2Saved: 6.3
  },
  {
    id: 'don_7',
    donorId: 'user_1',
    status: 'scheduled',
    items: [
      { name: 'Cooking Oil', quantity: 5, unit: 'liters', category: 'non-perishable' },
      { name: 'Lentils', quantity: 4, unit: 'kg', category: 'non-perishable' }
    ],
    pickupAddress: '404 Birch Boulevard, Springfield, IL 62707',
    recipientOrg: 'Downtown Kitchen',
    scheduledTime: '2025-09-21T15:00:00Z',
    createdAt: '2025-09-19T08:30:00Z',
    estimatedMeals: 22,
    co2Saved: 4.7
  }
]


// Function to calculate stats from donations
export const calculateUserStats = (donations: Donation[]): UserStats => {
  const completed = donations.filter(d => d.status === 'delivered')
  const active = donations.filter(d => ['scheduled', 'picked_up', 'in_transit'].includes(d.status))
  
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const thisMonthDonations = donations.filter(d => {
    const donationDate = new Date(d.createdAt)
    return donationDate.getMonth() === currentMonth && donationDate.getFullYear() === currentYear
  })

  return {
    totalDonations: donations.length,
    activeDonations: active.length,
    completedDonations: completed.length,
    totalMealsProvided: donations.reduce((sum, d) => sum + d.estimatedMeals, 0),
    totalCO2Saved: donations.reduce((sum, d) => sum + d.co2Saved, 0),
    currentMonth: {
      donations: thisMonthDonations.length,
      meals: thisMonthDonations.reduce((sum, d) => sum + d.estimatedMeals, 0)
    }
  }
}


