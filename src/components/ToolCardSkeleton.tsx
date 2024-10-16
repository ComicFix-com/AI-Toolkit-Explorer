import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ToolCardSkeleton: React.FC = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  );
};

export default ToolCardSkeleton;