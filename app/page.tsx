"use client"

import { useState } from "react"
import { EnvelopePage } from "@/components/valentine/envelope-page"
import { ProposalPage } from "@/components/valentine/proposal-page"
import { YippiePage } from "@/components/valentine/yippie-page"
import { GiftsPage } from "@/components/valentine/gifts-page"
import { FinalPage } from "@/components/valentine/final-page"

type Step = "envelope" | "proposal" | "yippie" | "gifts" | "final"

export default function Page() {
  const [step, setStep] = useState<Step>("envelope")

  switch (step) {
    case "envelope":
      return <EnvelopePage onOpen={() => setStep("proposal")} />
    case "proposal":
      return <ProposalPage onYes={() => setStep("yippie")} />
    case "yippie":
      return <YippiePage onContinue={() => setStep("gifts")} />
    case "gifts":
      return <GiftsPage onFinish={() => setStep("final")} />
    case "final":
      return <FinalPage />
    default:
      return <EnvelopePage onOpen={() => setStep("proposal")} />
  }
}
