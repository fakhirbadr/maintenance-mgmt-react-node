import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  iconColor?: string;
  iconBgColor?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-white",
  iconBgColor = "bg-primary",
}: StatsCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXVal = (y - centerY) / 20;
    const rotateYVal = (centerX - x) / 20;

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  return (
    <div
      ref={cardRef}
      className="transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
      }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease",
      }}
    >
      <Card
        className={`transition-all duration-300 ${isHovered ? "shadow-xl" : "shadow"}`}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            {title}
          </CardTitle>
          <div
            className={`rounded-lg p-2 ${iconBgColor} transition-transform duration-300`}
            style={{
              transform: isHovered
                ? `translateZ(20px) rotate(${rotateY}deg)`
                : "translateZ(0)",
            }}
          >
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="text-2xl font-bold"
            style={{
              transform: isHovered ? "translateZ(15px)" : "translateZ(0)",
              transition: "transform 0.3s ease",
            }}
          >
            {value}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCard;
