import Head from "next/head"

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

export function SEO({ title, description, canonical, ogImage }: SEOProps) {
  const defaultOgImage = "https://www.ardventurekfs.com/og-image.jpg"

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ARDVENTURE KFS" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
    </Head>
  )
}

