import {create} from 'zustand'
import type {User} from "@/types/index"
import { mockUser } from '@/data/mockData'


interface UserState{
    user: User | null
    isAuthenticated: boolean
    login: (user: User)=> void
    logout: ()=> void
    updateProfile: (updates: Partial<User>)=> void
}

export const useUserStore = create<UserState>((set)=>({
    user: mockUser,
    isAuthenticated: true,

    login: (user)=> set({user, isAuthenticated: true}),
    logout: ()=> set({user: null, isAuthenticated: false}),

    updateProfile: (updates) => set((state)=> ({
        user: state.user ? {...state.user, ...updates}: null
    }))
}))










