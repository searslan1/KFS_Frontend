import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import {
  setFeaturedCampaigns,
  setAllCampaigns,
  setUpcomingCampaigns,
  setSuccessfulCampaigns,
  setLoading,
  setError,
} from "../slices/campaignsSlice"
import { type Campaign, UpcomingCampaign, SuccessfulCampaign } from "@/types/campaign"

export const useCampaigns = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { featuredCampaigns, allCampaigns, upcomingCampaigns, successfulCampaigns, loading, error } = useSelector(
    (state: RootState) => state.campaigns,
  )

  const fetchFeaturedCampaigns = async () => {
    dispatch(setLoading(true))
    try {
      // API call would go here
      const data: Campaign[] = [] // Replace with actual API call
      dispatch(setFeaturedCampaigns(data))
    } catch (error) {
      dispatch(setError("Failed to fetch featured campaigns"))
    } finally {
      dispatch(setLoading(false))
    }
  }

  // Similar functions for other campaign types...

  return {
    featuredCampaigns,
    allCampaigns,
    upcomingCampaigns,
    successfulCampaigns,
    loading,
    error,
    fetchFeaturedCampaigns,
    // Other fetch functions...
  }
}

