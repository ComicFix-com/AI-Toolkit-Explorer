import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ToolCard from '../components/ToolCard';
import ToolCardSkeleton from '../components/ToolCardSkeleton';
import SearchBar from '../components/SearchBar';

const fetchTools = async () => {
  const response = await fetch('https://api.github.com/search/repositories?q=ai+in:name,description,readme&sort=stars&order=desc');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.items.map(item => ({
    id: item.id.toString(),
    name: item.name,
    description: item.description || 'No description available',
    url: item.html_url,
    category: 'AI Tools'
  }));
};

const Index = () => {
  const { data: tools, isLoading, error } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: fetchTools,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tools?.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Toolkit Explorer</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6).fill(0).map((_, index) => <ToolCardSkeleton key={index} />)
          : filteredTools?.map(tool => <ToolCard key={tool.id} tool={tool} />)
        }
      </div>
    </div>
  );
};

export default Index;