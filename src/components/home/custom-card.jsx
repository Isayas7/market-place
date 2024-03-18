"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import Link from "next/link";

export function CustomCard({
  album,
  aspectRatio,
  width,
  height,
  className,
  ...props
}) {
  return (
    <Link
      href={`/${album.category}/${album.type}/${album.productName}`}
      className={cn("space-y-3", className)}
      {...props}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={album.cover}
              alt={album.productName}
              width={width}
              height={height}
              className={cn(
                "h-full w-full object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.productName}</h3>
        <p className="text-xs text-muted-foreground">{album.price}</p>
      </div>
    </Link>
  );
}
