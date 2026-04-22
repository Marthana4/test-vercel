"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

type Question = {
  question: string;
  type: "choice" | "text";
  options?: string[];
};

type Section = {
  title: string;
  questions: Question[];
};

const data: Section[] = [
  {
    title: "Vision Besar",
    questions: [
      { question: "Mau wedding seperti apa?", type: "choice", options: ["Intimate", "Grand", "Medium"] },
      { question: "Vibes utama?", type: "choice", options: ["Romantic", "Fun", "Elegant"] },
      { question: "Describe wedding impian kamu (singkat)", type: "text" }
    ]
  },
  {
    title: "Budget & Prioritas",
    questions: [
      { question: "Range budget?", type: "choice", options: ["<50jt", "50-150jt", ">150jt"] },
      { question: "Prioritas utama?", type: "choice", options: ["Venue", "Dekor", "Catering", "Foto/Video"] }
    ]
  },
  {
    title: "Venue & Lokasi",
    questions: [
      { question: "Indoor atau outdoor?", type: "choice", options: ["Indoor", "Outdoor"] },
      { question: "Jenis venue?", type: "choice", options: ["Hotel", "Taman", "Pantai"] },
      { question: "Kota/lokasi impian", type: "text" }
    ]
  },
  {
    title: "Konsep & Style",
    questions: [
      { question: "Konsep utama?", type: "choice", options: ["Fairy", "Beach", "European", "Modern"] },
      { question: "Level detail?", type: "choice", options: ["Minimal", "Detail", "Luxury"] }
    ]
  },
  {
    title: "Warna & Visual",
    questions: [
      { question: "Tone warna?", type: "choice", options: ["Soft", "Bold", "Neutral"] },
      { question: "Palette utama?", type: "choice", options: ["Putih", "Pastel", "Earth tone"] }
    ]
  },
  {
    title: "Prewedding",
    questions: [
      { question: "Lokasi foto?", type: "choice", options: ["Studio", "Outdoor", "Abroad"] },
      { question: "Konsep foto?", type: "choice", options: ["Casual", "Formal", "Thematic"] },
      { question: "Referensi/ide spesifik yang kamu mau", type: "text" }
    ]
  },
  {
    title: "Decoration",
    questions: [
      { question: "Style dekor?", type: "choice", options: ["Simple", "Floral", "Luxury"] },
      { question: "Fokus dekor?", type: "choice", options: ["Pelaminan", "Aisle", "Meja tamu"] }
    ]
  },
  {
    title: "Look Pengantin",
    questions: [
      { question: "Style dress?", type: "choice", options: ["Classic", "Modern", "Princess"] },
      { question: "Makeup look?", type: "choice", options: ["Natural", "Glam", "Soft glam"] }
    ]
  },
  {
    title: "Tamu & Format",
    questions: [
      { question: "Jumlah tamu?", type: "choice", options: ["<100", "100-300", ">300"] },
      { question: "Format acara?", type: "choice", options: ["Standing", "Sitting", "Mix"] }
    ]
  },
  {
    title: "Suasana Acara",
    questions: [
      { question: "Flow acara?", type: "choice", options: ["Santai", "Terstruktur"] },
      { question: "Entertainment?", type: "choice", options: ["Band", "DJ", "Acoustic"] }
    ]
  },
  {
    title: "Experience Tamu",
    questions: [
      { question: "Yang ingin ditonjolkan?", type: "choice", options: ["Food", "Decor", "Entertainment"] },
      { question: "Tambahan experience?", type: "choice", options: ["Photobooth", "Games", "Live sketch"] }
    ]
  },
  {
    title: "Teknis",
    questions: [
      { question: "WO atau DIY?", type: "choice", options: ["WO", "DIY", "Mix"] },
      { question: "Timeline?", type: "choice", options: ["Cepat", "Santai"] }
    ]
  },
  {
    title: "Nilai Personal",
    questions: [
      { question: "Makna wedding?", type: "choice", options: ["Sacred", "Celebration", "Both"] },
      { question: "Ada tradisi khusus?", type: "choice", options: ["Ya", "Tidak"] },
      { question: "Hal personal yang wajib ada", type: "text" }
    ]
  }
];

export default function WeddingForm() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = data[step];

  const handleSelect = (qIndex: number, option: string) => {
    const key = `${step}-${qIndex}`;
    setAnswers({ ...answers, [key]: option });
  };

  const handleInput = (qIndex: number, value: string) => {
    const key = `${step}-${qIndex}`;
    setAnswers({ ...answers, [key]: value });
  };

  const nextStep = () => {
    if (step < data.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const progress = ((step + 1) / data.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-4">💍 Wedding Quiz</h1>

        <Progress value={progress} className="mb-6" />

        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {step + 1}. {current.title}
            </h2>

            <div className="space-y-4">
              {current.questions.map((q, i) => (
                <div key={i}>
                  <p className="text-sm mb-2">{q.question}</p>

                  {q.type === "choice" && q.options && (
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelect(i, opt)}
                          className={`p-2 rounded-xl border text-sm transition ${answers[`${step}-${i}`] === opt
                              ? "bg-pink-300 text-white border-pink-400"
                              : "bg-white hover:bg-pink-100"
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === "text" && (
                    <Input
                      placeholder="Ceritain dikit..."
                      value={answers[`${step}-${i}`] || ""}
                      onChange={(e) => handleInput(i, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              {step === data.length - 1 ? (
                <Button>Finish 💖</Button>
              ) : (
                <Button onClick={nextStep}>Next</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}