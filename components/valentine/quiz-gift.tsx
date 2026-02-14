"use client"

import { useState } from "react"
import { PixelHeart, PixelCharacter, FloatingHearts, PixelStar } from "./pixel-art"

interface Question {
  question: string
  options: string[]
  correct: number
  wrongResponse: string
}

const questions: Question[] = [
  {
    question: "What is my favorite food?",
    options: ["Samyang", "Sushi", "Pizza", "All of the above"],
    correct: 3,
    wrongResponse: "How dare you not remembering my favorite food?!?😤",
  },
  {
    question: "What is my shoe size?",
    options: ["40", "41", "41 1/3", "40 1/2"],
    correct: 1,
    wrongResponse: "Hmmm, try to remember it!!😒",
  },
  {
    question: "Where is our first date located?",
    options: ["23 Paskal", "ITB", "Cibadak", "Ranca Upas"],
    correct: 2,
    wrongResponse: "Parah kok kamu lupa sih?!?😠",
  },
  {
    question: "If we had a son, who would we call him?",
    options: ["Aaron", "Pierrre", "Aaliyah", "Adylan jr."],
    correct: 0,
    wrongResponse: "Coba lagi😒",
  },
  {
    question: "What is my biggest fear?",
    options: ["You", "Getting back to Singapore", "Not getting Amazon return offer", "Losing you"],
    correct: 3,
    wrongResponse: "Kurang nakutin bagiku",
  },
  {
    question: "The time of our marriage?",
    options: ["08.00", "10.00", "11.30", "14.00"],
    correct: 1,
    wrongResponse: "Itu mah kita lagi ngapain kali😫",
  },
]

export function QuizGift({ onBack }: { onBack: () => void }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [isWrong, setIsWrong] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completed, setCompleted] = useState(false)

  const q = questions[currentQ]

  const handleSelect = (idx: number) => {
    setSelected(idx)
    if (idx === q.correct) {
      setIsCorrect(true)
      setIsWrong(false)
    } else {
      setIsWrong(true)
      setIsCorrect(false)
    }
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1)
      setSelected(null)
      setIsWrong(false)
      setIsCorrect(false)
    } else {
      setCompleted(true)
    }
  }

  if (completed) {
    return (
      <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 overflow-hidden">
        <FloatingHearts />
        <div className="flex flex-col items-center gap-6 z-10 animate-pop-in">
          <PixelCharacter type="bear" size={100} className="animate-bounce-gentle" />
          <div className="flex items-center gap-2">
            <PixelStar size={28} className="animate-sparkle" />
            <h2 className="font-pixel text-base md:text-xl text-primary text-center">
              You aced it!
            </h2>
            <PixelStar size={28} className="animate-sparkle" />
          </div>
          <p className="font-sans text-sm text-muted-foreground text-center">
            {"You truly love me!😋🫠"}
          </p>
          <div className="flex items-center gap-2">
            <PixelHeart size={20} className="animate-pulse-heart" />
            <PixelHeart size={30} className="animate-pulse-heart" style={{ animationDelay: "0.2s" }} />
            <PixelHeart size={20} className="animate-pulse-heart" style={{ animationDelay: "0.4s" }} />
          </div>
          <button
            onClick={onBack}
            className="mt-4 rounded-xl border-4 border-primary bg-primary px-8 py-4 font-pixel text-xs text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
          >
            Back to Gifts
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-8 overflow-hidden">
      <FloatingHearts />

      <div className="flex flex-col items-center gap-6 z-10 w-full max-w-lg animate-pop-in">
        {/* Progress */}
        <div className="flex items-center gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i <= currentQ ? "w-8 bg-primary" : "w-4 bg-secondary"
              }`}
            />
          ))}
        </div>

        {/* Character */}
        <PixelCharacter
          type="bear"
          size={70}
          className={isWrong ? "animate-shake" : isCorrect ? "animate-bounce-gentle" : ""}
        />

        {/* Question */}
        <div className="rounded-2xl border-4 border-primary bg-card p-6 shadow-xl w-full">
          <p className="font-pixel text-xs md:text-sm text-primary text-center leading-relaxed mb-1">
            Question {currentQ + 1}/{questions.length}
          </p>
          <p className="font-sans text-sm md:text-base text-card-foreground text-center leading-relaxed mt-3">
            {q.question}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 w-full">
          {q.options.map((opt, i) => {
            const isSelected = selected === i
            const isCorrectAnswer = i === q.correct && isCorrect
            const isWrongAnswer = isSelected && isWrong

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={isCorrect}
                className={`rounded-xl border-2 px-4 py-3 font-sans text-sm text-left transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring
                  ${
                    isCorrectAnswer
                      ? "border-primary bg-primary text-primary-foreground scale-105 shadow-lg"
                      : isWrongAnswer
                      ? "border-destructive bg-destructive/10 text-destructive animate-shake"
                      : isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-card-foreground hover:border-primary hover:bg-primary/5"
                  }
                `}
              >
                <span className="font-pixel text-[10px] text-muted-foreground mr-2">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {/* Wrong answer response */}
        {isWrong && (
          <div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-4 animate-pop-in">
            <p className="font-sans text-sm text-destructive text-center">
              {q.wrongResponse}
            </p>
            <p className="font-pixel text-[10px] text-destructive/70 text-center mt-2">
              Try again!
            </p>
          </div>
        )}

        {/* Correct + Next */}
        {isCorrect && (
          <div className="flex flex-col items-center gap-4 animate-pop-in">
            <div className="flex items-center gap-2">
              <PixelHeart size={16} className="animate-pulse-heart" />
              <p className="font-pixel text-xs text-primary">Correct!</p>
              <PixelHeart size={16} className="animate-pulse-heart" />
            </div>
            <button
              onClick={handleNext}
              className="rounded-xl border-4 border-primary bg-primary px-8 py-3 font-pixel text-xs text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              {currentQ < questions.length - 1 ? "Next" : "Finish Quiz"}
            </button>
          </div>
        )}

        {/* Back button */}
        <button
          onClick={onBack}
          className="font-sans text-xs text-muted-foreground underline hover:text-primary transition-colors"
        >
          Back to gifts
        </button>
      </div>
    </main>
  )
}
