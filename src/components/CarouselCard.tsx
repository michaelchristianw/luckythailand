"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const cards = [
  {
    title:
      "ผลิตภัณฑ์ซักผ้า ลัคกี้คลีน ลักซ์ชูเรียส มิสต์ กลิ่นพิงค์มิราจ 1200 ml",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, eaque labore ullam similique magnam quo!",
    image: "/detergent/detergent-pinkmirage-1200.png",
  },
  {
    title:
      "ผลิตภัณฑ์ซักผ้า ลัคกี้คลีน ลักซ์ชูเรียส มิสต์ กลิ่นโอเชียนเพิร์ล 1200 ml",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, eaque labore ullam similique magnam quo!",
    image: "/detergent/detergent-oceanpearl-1200.png",
  },
  {
    title:
      "ผลิตภัณฑ์ซักผ้า ลัคกี้คลีน ลักซ์ชูเรียส มิสต์ กลิ่นมิสทิคไวโอเลต 1200 ml",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, eaque labore ullam similique magnam quo!",
    image: "/detergent/detergent-mysticviolet-1200.png",
  },
  {
    title: "ทิชชูเปียก ลัคกี้แคร์ 50 แผ่น กลิ่นแป้งเด็ก",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, eaque labore ullam similique magnam quo!",
    image: "/tissue/tissue3.png",
  },
  {
    title: "ทิชชูเปียก ลัคกี้แคร์ 50 แผ่น กลิ่นแป้งเด็ก",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, eaque labore ullam similique magnam quo!",
    image: "/tissue/tissue4.png",
  },
  {
    title: "กระดาษชำระ ลัคกี้แคร์ ชนิดม้วน 6ม้วนต่อแพ็ค",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, eaque labore ullam similique magnam quo!",
    image: "/tissue/tissue8.png",
  },
];

export const CarouselCard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("AboutPage");

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.scrollWidth / cards.length;
    const scrollAmount = direction === "right" ? cardWidth : -cardWidth;

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-6xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 lg:px-16 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl">{t("shopTitle")}</h2>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="hidden lg:flex p-2 bg-gray-200 rounded-full hover:bg-gray-300 absolute -left-14 top-[30%] lg:top-[40%] transform -translate-y-1/2 z-10 shadow-lg hover:cursor-pointer"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex p-2 bg-gray-200 rounded-full hover:bg-gray-300 absolute -right-14 top-[30%] lg:top-[40%] transform -translate-y-1/2 z-10 shadow-lg hover:cursor-pointer"
        >
          <ChevronRight />
        </button>

        <div
          ref={scrollRef}
          className="flex py-5 gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
          style={{ height: "auto" }}
        >
          {cards.map((card) => (
            <div key={card.image} className="flex flex-col gap-3">
              <div className=" w-32 md:w-60 flex items-center justify-center flex-shrink-0 bg-blue-200/30 hover:bg-blue-200 rounded-xl shadow border-black snap-start transition-colors duration-200">
                <div className="h-40 md:h-80">
                  <Image
                    width={400}
                    height={600}
                    src={card.image}
                    alt={card.title}
                    className="h-40 md:h-80 w-full object-contain rounded flex-shrink-0"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="mb-2">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
