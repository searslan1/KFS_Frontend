import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Feature {
  icon: string
  title: string
  description: string
}

interface FeaturesState {
  features: Feature[]
}

const initialState: FeaturesState = {
  features: [
    {
      icon: "Lock",
      title: "Güvenli ve Yasal",
      description: "SPK lisanslı ve tam yasal uyumlu platform ile güvenli yatırım imkanı",
    },
    {
      icon: "BarChart",
      title: "Şeffaf Süreç",
      description: "Gerçek zamanlı kampanya takibi ve detaylı raporlama sistemi",
    },
    {
      icon: "Users",
      title: "Geniş Ağ",
      description: "Binlerce yatırımcı ve girişimciden oluşan aktif topluluk",
    },
  ],
}

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    setFeatures: (state, action: PayloadAction<Feature[]>) => {
      state.features = action.payload
    },
  },
})

export const { setFeatures } = featuresSlice.actions

export default featuresSlice.reducer

