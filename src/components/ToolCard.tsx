import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  stars?: number;
}

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{tool.name}</CardTitle>
        <CardDescription>{tool.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{tool.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => window.open(tool.url, '_blank')}
        >
          Read More
        </Button>
        {tool.stars !== undefined && (
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            <span>{tool.stars}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ToolCard;