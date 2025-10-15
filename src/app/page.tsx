"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import DetailsPane from "./components/DetailsPane";
import ImageGallery from "./components/ImageGallery";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Home = () => {
  const { data, error, isLoading } = useSWR<ReadonlyArray<Bike>>(
    "/api/bikes",
    fetcher,
  );
  const [, setSelectedColor] = useState<string | null>(null);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);

  useEffect(() => {
    if (data?.[0]) {
      const defaultColor = data[0].options.color[0];
      setSelectedColor(defaultColor.name);
      setDisplayedImages(defaultColor.images);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    const color = data?.[0].options.color.find((c) => c.name === colorName);
    if (color) {
      setDisplayedImages(color.images);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <div className="rounded lg:col-span-2">
        <ImageGallery images={displayedImages} />
      </div>
      <div className="rounded lg:col-span-1">
        <h1 className="text-2xl font-bold text-center lg:text-start">
          {data?.[0].name}
        </h1>
        <p className="text-sm text-muted-foreground text-center lg:text-start">
          {data?.[0].description}
        </p>
        <DetailsPane
          options={data?.[0].options}
          basePrice={data?.[0].basePrice || 0}
          onColorChange={handleColorChange}
        />
      </div>
    </div>
  );
};

export default Home;
