export interface UserProfile {
  id: string
  ranking: number
  name: string
  location: string
  website?: string
  email: string
  phone: string
  photoUrl?: string
  languages: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
  stats: {
    problems: number
    offMarket: number
    management: "Yes" | "No"
    topCategory: string
    feedback: string
  }
  achievements: {
    title: string
    score: number
    type: "success" | "primary" | "secondary"
  }[]
  experience: {
    year: number
    title: string
    company: string
    location: string
    type: string
    current?: boolean
  }[]
}

