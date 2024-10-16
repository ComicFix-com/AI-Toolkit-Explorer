import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ToolCard from '../components/ToolCard';
import ToolCardSkeleton from '../components/ToolCardSkeleton';
import SearchBar from '../components/SearchBar';
import DonationButton from '../components/DonationButton';

const keywords = [
  "AI", "GPT-4", "WebGPT-4", "AI Assistant", "GPT-4 Model", "WebGPT-4 Chatbot",
  "Artificial Intelligence", "Generative Pre-trained Transformer 4", "Web AI",
  "ChatGPT", "AI Language Model", "OpenAI GPT-4", "Conversational AI", "WebGPT AI",
  "Machine Learning", "Deep Learning", "Natural Language Processing", "AI Algorithms",
  "GPT Technology", "Web-Based AI", "AI-Powered Assistant", "AI Tools", "GPT-4 Application",
  "WebGPT-4 Integration", "AI Chatbot", "Language AI", "Smart AI", "WebGPT for Developers",
  "AI Innovations", "Chatbot AI", "Intelligent Systems", "AI-Driven Solutions",
  "Advanced AI Models", "AI and Machine Learning", "GPT-4 Features", "WebGPT-4 Capabilities",
  "AI Research", "Generative AI", "Web GPT Technologies", "AI Frameworks", "GPT-4 in Practice",
  "WebGPT-4 User Experience", "AI-Based Solutions", "AI Ethics", "WebGPT-4 Functionality",
  "AI Development", "GPT-4 Evolution", "WebGPT-4 for Businesses", "AI Use Cases", "AI Trends",
  "GPT-4 Performance", "WebGPT-4 Applications",
  // New keywords
  "Python", "Education", "Data Science", "R", "Scikit-learn",
  "Machine Learning Algorithms", "ML", "Machine Learning Python",
  "Scikit-learn Python"
];

const fetchTools = async () => {
  const query = keywords.map(keyword => `${keyword} in:name,description,readme`).join(' OR ');
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(`https://api.github.com/search/repositories?q=${encodedQuery}&sort=stars&order=desc&per_page=100`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.items.map(item => ({
    id: item.id.toString(),
    name: item.name,
    description: item.description || 'No description available',
    url: item.html_url,
    category: 'AI Tools',
    stars: item.stargazers_count
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
      <h1 className="text-3xl font-bold mb-8 text-center">AI Toolkit Explorer</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6).fill(0).map((_, index) => <ToolCardSkeleton key={index} />)
          : filteredTools?.map(tool => <ToolCard key={tool.id} tool={tool} />)
        }
      </div>
      <div className="mt-8 text-center">
        <DonationButton />
      </div>
    </div>
  );
};

export default Index;