"use client";

import Image from "next/image";
import Button from "./Button";
import type { Resource } from "@/lib/types";

interface ResourceCardProps {
  resource: Resource;
  onFreeResourceClick?: (resource: Resource) => void;
}

export default function ResourceCard({
  resource,
  onFreeResourceClick,
}: ResourceCardProps) {
  const handleClick = () => {
    if (resource.isFree && onFreeResourceClick) {
      onFreeResourceClick(resource);
    }
  };

  return (
    <article className="bg-cream rounded-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      {resource.thumbnail && (
        <div className="relative aspect-[4/3] bg-blush">
          <Image
            src={resource.thumbnail}
            alt={resource.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-cormorant text-xl md:text-2xl font-semibold text-olive mb-2">
          {resource.title}
        </h3>

        {resource.price && (
          <p className="font-inter text-lg font-medium text-terracotta mb-3">
            {resource.price}
          </p>
        )}

        <p className="font-inter text-olive/80 leading-relaxed mb-6 flex-grow">
          {resource.description}
        </p>

        {resource.isFree ? (
          <Button variant="secondary" onClick={handleClick}>
            {resource.buttonText}
          </Button>
        ) : (
          <Button variant="primary" href={resource.link}>
            {resource.buttonText}
          </Button>
        )}
      </div>
    </article>
  );
}
