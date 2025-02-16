import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Subsidiary } from "@/lib/mockData"

interface SubsidiariesState {
  subsidiaries: Subsidiary[]
  loading: boolean
  error: string | null
}

const initialState: SubsidiariesState = {
  subsidiaries: [],
  loading: false,
  error: null,
}

const subsidiariesSlice = createSlice({
  name: "subsidiaries",
  initialState,
  reducers: {
    setSubsidiaries: (state, action: PayloadAction<Subsidiary[]>) => {
      state.subsidiaries = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setSubsidiaries, setLoading, setError } = subsidiariesSlice.actions

export default subsidiariesSlice.reducer

