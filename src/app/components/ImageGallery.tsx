"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";

type ImageGalleryProps = Readonly<{
  images: ReadonlyArray<string>;
}>;

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (event.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length]);

  const selectedImage = images[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(selectedIndex);
    }
  }, [selectedIndex, carouselApi]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full mb-4">
        <Card>
          <CardContent className="flex items-center justify-center">
            <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt=""
                  fill
                  className="rounded-xl object-contain"
                  priority
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        setApi={setCarouselApi}
        className="w-full max-w-sm"
      >
        <CarouselContent className="-ml-1 p-2">
          {images.map((image, index) => (
            <CarouselItem
              key={image}
              className="pl-1 md:basis-1/3 lg:basis-1/4"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="p-1 cursor-pointer transition-transform hover:scale-105">
                <Card
                  className={`${
                    index === selectedIndex
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                >
                  <CardContent className="flex items-center justify-center p-0">
                    <div className="w-[100px] h-[50px] relative">
                      <Image
                        src={image}
                        alt=""
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={handlePrevious} />
        <CarouselNext onClick={handleNext} />
      </Carousel>
    </div>
  );
};

export default memo(ImageGallery);
