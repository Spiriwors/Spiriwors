"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface FilterButtonProps {
  folder: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  folder,
  isActive,
  onClick,
}) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const frameTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const getImagePath = (frame: number) => {
    const frameStr = frame.toString().padStart(2, "0");
    return `/images/trabajos_huevos/${folder}/${frameStr}.png`;
  };

  useEffect(() => {
    if (isActive && !isHovering) {
      setCurrentFrame(4);
      frameTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      frameTimeoutsRef.current = [];
      return;
    }

    if (!isActive && !isHovering) {
      setCurrentFrame(1);
      frameTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      frameTimeoutsRef.current = [];
      return;
    }

    if (isHovering) {
      frameTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      frameTimeoutsRef.current = [];

      if (currentFrame === 2) {
        const timeout1 = setTimeout(() => setCurrentFrame(3), 100);
        const timeout2 = setTimeout(() => setCurrentFrame(4), 200);
        frameTimeoutsRef.current.push(timeout1, timeout2);
      } else if (currentFrame === 3) {
        const timeout = setTimeout(() => setCurrentFrame(4), 100);
        frameTimeoutsRef.current.push(timeout);
      }
    }

    return () => {
      frameTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      frameTimeoutsRef.current = [];
    };
  }, [isHovering, currentFrame, isActive]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setCurrentFrame(2);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    frameTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    frameTimeoutsRef.current = [];
    if (isActive) {
      setCurrentFrame(4);
    } else {
      setCurrentFrame(1);
    }
  };

  const handleClick = () => {
    if (!isActive) {
      setCurrentFrame(4);
      setIsHovering(false);
      frameTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      frameTimeoutsRef.current = [];
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
    >
      <Image
        src={getImagePath(currentFrame)}
        alt={folder}
        width={200}
        height={200}
        className="object-contain transition-opacity duration-100"
        unoptimized
      />
    </button>
  );
};

export default FilterButton;

