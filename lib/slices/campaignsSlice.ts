import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Campaign, UpcomingCampaign, SuccessfulCampaign } from "@/lib/mockData"

interface CampaignsState {
  featuredCampaigns: Campaign[]
  allCampaigns: Campaign[]
  upcomingCampaigns: UpcomingCampaign[]
  successfulCampaigns: SuccessfulCampaign[]
  selectedCampaign: Campaign | null
  loading: boolean
  error: string | null
}

const initialState: CampaignsState = {
  featuredCampaigns: [],
  allCampaigns: [],
  upcomingCampaigns: [],
  successfulCampaigns: [],
  selectedCampaign: null,
  loading: false,
  error: null,
}

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    setFeaturedCampaigns: (state, action: PayloadAction<Campaign[]>) => {
      state.featuredCampaigns = action.payload
    },
    setAllCampaigns: (state, action: PayloadAction<Campaign[]>) => {
      state.allCampaigns = action.payload
    },
    setUpcomingCampaigns: (state, action: PayloadAction<UpcomingCampaign[]>) => {
      state.upcomingCampaigns = action.payload
    },
    setSuccessfulCampaigns: (state, action: PayloadAction<SuccessfulCampaign[]>) => {
      state.successfulCampaigns = action.payload
    },
    setSelectedCampaign: (state, action: PayloadAction<Campaign | null>) => {
      state.selectedCampaign = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setFeaturedCampaigns,
  setAllCampaigns,
  setUpcomingCampaigns,
  setSuccessfulCampaigns,
  setSelectedCampaign,
  setLoading,
  setError,
} = campaignsSlice.actions

export default campaignsSlice.reducer

