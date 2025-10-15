"use client";

import { BikeIcon } from "lucide-react";
import { memo } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="p-4 mb-4 lg:border-b-2 lg:border-b-muted">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-foreground" href="/">
              <span className="sr-only">Home</span>
              <div className="flex items-center gap-2">
                <BikeIcon size={32} />
                <h1 className="font-bold text-xl">Bike Configurator</h1>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="flex gap-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
