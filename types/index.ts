export interface Campaign {
  id: string
  title: string
  description: string
  goalAmount: number
  currentAmount: number
  imageUrl: string
  daysLeft: number
  startDate: string
  endDate: string
  teamSize: number
  technology: string
}

export interface UpcomingCampaign {
  id: string
  title: string
  description: string
  imageUrl: string
  expectedLaunchDate: string
}

export interface SuccessfulCampaign {
  id: string
  title: string
  description: string
  imageUrl: string
  raisedAmount: number
  completionDate: string
}

export interface Partner {
  id: string
  name: string
  logoUrl: string
}

export interface Subsidiary {
  id: string
  name: string
  description: string
  logoUrl: string
}

