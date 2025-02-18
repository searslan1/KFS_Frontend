import axios from "axios"
import { type Campaign, UpcomingCampaign, SuccessfulCampaign } from "@/types/campaign"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const campaignApi = {
  getFeaturedCampaigns: async (): Promise<Campaign[]> => {
    const response = await axios.get(`${API_URL}/campaigns/featured`)
    return response.data
  },

  getAllCampaigns: async (): Promise<Campaign[]> => {
    const response = await axios.get(`${API_URL}/campaigns`)
    return response.data
  },

  // Other API calls...
}

