import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CTAState {
  title: string
  description: string
  buttonText: string
}

const initialState: CTAState = {
  title: "Geleceğin Bir Parçası Olun",
  description: "Hemen üye olun ve yenilikçi projelere yatırım yapmaya başlayın",
  buttonText: "Ücretsiz Üye Ol",
}

const ctaSlice = createSlice({
  name: "cta",
  initialState,
  reducers: {
    updateCTA: (state, action: PayloadAction<Partial<CTAState>>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { updateCTA } = ctaSlice.actions

export default ctaSlice.reducer

