import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AudienceLanding } from "@/components/lp/audience-landing"
import { getAudience, AUDIENCE_SLUGS } from "@/lib/audiences"

export function generateStaticParams() {
  return AUDIENCE_SLUGS.map((audience) => ({ audience }))
}

export function generateMetadata({ params }: { params: { audience: string } }): Metadata {
  const audience = getAudience(params.audience)
  if (!audience) return {}
  return {
    title: audience.meta.title,
    description: audience.meta.description,
    alternates: { canonical: `https://fairmieterstrom.energy/lp/${audience.slug}` },
    openGraph: {
      title: audience.meta.title,
      description: audience.meta.description,
      type: "website",
    },
    robots: { index: false, follow: false },
  }
}

export default function AudienceLandingPage({ params }: { params: { audience: string } }) {
  const audience = getAudience(params.audience)
  if (!audience) notFound()
  return <AudienceLanding audience={audience} />
}
