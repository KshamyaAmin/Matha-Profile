import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm animate-pulse">
      {/* Image Box Skeleton */}
      <div className="aspect-square bg-gray-250 bg-slate-200" />
      
      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-3.5 md:p-4 space-y-3">
        {/* Category tag */}
        <div className="h-3 w-1/3 rounded bg-slate-200" />
        
        {/* Product Name (two lines) */}
        <div className="space-y-1.5">
          <div className="h-4 w-4/5 rounded bg-slate-250 bg-slate-200" />
          <div className="h-4 w-2/3 rounded bg-slate-250 bg-slate-200" />
        </div>
        
        {/* Product Description Specs */}
        <div className="hidden md:block space-y-1.5 py-1">
          <div className="h-3 w-full rounded bg-slate-100" />
          <div className="h-3 w-5/6 rounded bg-slate-100" />
        </div>
        
        {/* Buttons */}
        <div className="mt-auto flex flex-col gap-1.5 md:grid md:grid-cols-2 md:gap-2 pt-2">
          <div className="h-5 md:h-9 rounded bg-slate-100 w-full" />
          <div className="h-5 md:h-9 rounded bg-slate-250 bg-slate-200 w-full" />
        </div>
      </div>
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:gap-6 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
}
