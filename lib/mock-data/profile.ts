export const mockProfileData: UserProfile = {
  id: "1",
  ranking: 5,
  name: "John Doe",
  location: "San Francisco, CA",
  website: "website",
  email: "hello@spacencv.io",
  phone: "512-555-0189",
  photoUrl:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/resim-i0cpfqcVUm30lWeWZkzAVJKCcXrlJh.png",
  languages: ["es", "en", "de"],
  socialLinks: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    website: "#",
  },
  stats: {
    problems: 2,
    offMarket: 105,
    management: "Yes",
    topCategory: "Rent",
    feedback: "Honest",
  },
  achievements: [
    {
      title: "TOP LUXURY HIGH END",
      score: 105,
      type: "success",
    },
    {
      title: "TOP 1%",
      score: 105,
      type: "kfs",
    },
    {
      title: "TOP 10%",
      score: 105,
      type: "secondary",
    },
  ],
  experience: [
    {
      year: 2021,
      title: "Sr. Real Estate Agent",
      company: "Agency X",
      location: "San Francisco, CA",
      type: "Part Time",
      current: true,
    },
    {
      year: 2020,
      title: "Sales Agent",
      company: "Agency X",
      location: "San Francisco, CA",
      type: "Part Time",
    },
    {
      year: 2019,
      title: "Jr. Sales Agent",
      company: "Agency X",
      location: "San Francisco, CA",
      type: "Part Time",
    },
    {
      year: 2018,
      title: "Agent",
      company: "Agency X",
      location: "San Francisco, CA",
      type: "Part Time",
    },
  ],
};
