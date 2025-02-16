import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Stat {
  icon: string
  value: string
  label: string
}

interface StatsState {
  stats: Stat[]
}

const initialState: StatsState = {
  stats: [
    { icon: "BarChart", value: "1.2M+", label: "Toplam Yatırım (₺)" },
    { icon: "Award", value: "300+", label: "Başarılı Proje" },
    { icon: "Users", value: "10K+", label: "Aktif Yatırımcı" },
    { icon: "TrendingUp", value: "%92", label: "Başarı Oranı" },
  ],
}

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<Stat[]>) => {
      state.stats = action.payload
    },
    updateStat: (state, action: PayloadAction<{ index: number; stat: Partial<Stat> }>) => {
      const { index, stat } = action.payload
      state.stats[index] = { ...state.stats[index], ...stat }
    },
  },
})

export const { setStats, updateStat } = statsSlice.actions

export default statsSlice.reducer

