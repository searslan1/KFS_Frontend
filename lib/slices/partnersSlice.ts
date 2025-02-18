import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Partner } from "@/lib/mockData"

interface PartnersState {
  partners: Partner[]
  loading: boolean
  error: string | null
}

const initialState: PartnersState = {
  partners: [],
  loading: false,
  error: null,
}

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    setPartners: (state, action: PayloadAction<Partner[]>) => {
      state.partners = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setPartners, setLoading, setError } = partnersSlice.actions

export default partnersSlice.reducer

