// src/pages/DashboardPage.tsx
import { useEffect } from 'react'
import { useUserStore } from '../stores/userStore'
import { useDonationStore } from '../stores/donationStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Package, 
  Utensils, 
  Leaf, 
  Calendar, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MapPin,
  User
} from 'lucide-react'

export default function DashboardPage() {
  const { user } = useUserStore()
  const { 
    donations, 
    loading, 
    error, 
    stats, 
    recentDonations, 
    activeDonations,
    fetchDonations,
    updateDonationStatus 
  } = useDonationStore()

  // Simulate initial data fetch
  useEffect(() => {
    fetchDonations()
  }, [fetchDonations])

  const handleStatusChange = (donationId: string, newStatus: any) => {
    updateDonationStatus(donationId, newStatus)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary'
      case 'scheduled': return 'default'
      case 'picked_up': return 'default'
      case 'in_transit': return 'default'
      case 'delivered': return 'default'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'scheduled': return <Calendar className="h-4 w-4" />
      case 'picked_up': return <Package className="h-4 w-4" />
      case 'in_transit': return <Truck className="h-4 w-4" />
      case 'delivered': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            Please log in to view your dashboard.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[60px]" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground">
          Here's your donation activity and impact summary.
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDonations}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Donations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDonations}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meals Provided</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMealsProvided}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCO2Saved.toFixed(1)}kg</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentMonth.donations}</div>
            <p className="text-xs text-muted-foreground">
              {stats.currentMonth.meals} meals provided
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Donations ({activeDonations.length})</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {activeDonations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <Package className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No active donations</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    You don't have any active donations at the moment.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {activeDonations.map(donation => (
                <Card key={donation.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {donation.items[0].name} 
                          {donation.items.length > 1 && (
                            <span className="text-sm text-muted-foreground">
                              + {donation.items.length - 1} more
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription>
                          Scheduled for {donation.scheduledTime ? 
                            new Date(donation.scheduledTime).toLocaleDateString() : 
                            'TBD'}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusVariant(donation.status)} className="flex items-center gap-1">
                        {getStatusIcon(donation.status)}
                        {donation.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{donation.pickupAddress}</span>
                        </div>
                        {donation.recipientOrg && (
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>Going to: {donation.recipientOrg}</span>
                          </div>
                        )}
                        <div className="text-sm">
                          <span className="font-medium">Items:</span> {donation.items.map(item => 
                            `${item.quantity} ${item.unit} ${item.name}`).join(', ')}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Utensils className="h-4 w-4 text-muted-foreground" />
                            <span>{donation.estimatedMeals} meals</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Leaf className="h-4 w-4 text-muted-foreground" />
                            <span>{donation.co2Saved}kg CO₂ saved</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => console.log('View tracking for', donation.id)}
                          >
                            Track Donation
                          </Button>
                          
                          {donation.status === 'pending' && (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleStatusChange(donation.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          )}
                          
                          {donation.status === 'scheduled' && (
                            <Button 
                              size="sm"
                              onClick={() => handleStatusChange(donation.id, 'picked_up')}
                            >
                              Mark as Picked Up
                            </Button>
                          )}
                          
                          {donation.status === 'picked_up' && (
                            <Button 
                              size="sm"
                              onClick={() => handleStatusChange(donation.id, 'in_transit')}
                            >
                              Mark in Transit
                            </Button>
                          )}
                          
                          {donation.status === 'in_transit' && (
                            <Button 
                              size="sm"
                              onClick={() => handleStatusChange(donation.id, 'delivered')}
                            >
                              Mark as Delivered
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {recentDonations.map(donation => (
              <Card key={donation.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-medium">
                        {donation.items[0].name} 
                        {donation.items.length > 1 && (
                          <span className="text-sm text-muted-foreground">
                            {' '}+ {donation.items.length - 1} more
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Created: {new Date(donation.createdAt).toLocaleDateString()}</span>
                        {donation.completedAt && (
                          <span>Completed: {new Date(donation.completedAt).toLocaleDateString()}</span>
                        )}
                        <span className="flex items-center gap-1">
                          <Utensils className="h-3 w-3" />
                          {donation.estimatedMeals} meals
                        </span>
                        <span className="flex items-center gap-1">
                          <Leaf className="h-3 w-3" />
                          {donation.co2Saved}kg CO₂
                        </span>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(donation.status)}>
                      {donation.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Debug Info (Remove in production) */}
      <details className="debug-info">
        <summary className="cursor-pointer text-sm text-muted-foreground">Debug: All Donations Data</summary>
        <pre className="mt-2 p-4 bg-muted rounded-md overflow-auto text-xs">
          {JSON.stringify(donations, null, 2)}
        </pre>
      </details>
    </div>
  )
}