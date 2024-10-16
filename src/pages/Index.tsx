import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ToolCard from '../components/ToolCard';
import ToolCardSkeleton from '../components/ToolCardSkeleton';
import SearchBar from '../components/SearchBar';
import DonationButton from '../components/DonationButton';
import ErrorBoundary from '../components/ErrorBoundary';

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
  try {
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
  } catch (error) {
    console.error('Error fetching tools:', error);
    throw error;
  }
};

const Index = () => {
  const { data: tools, isLoading, error, refetch } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: fetchTools,
    retry: 3,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tools?.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleOnline = () => {
      if (error) {
        refetch();
      }
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [error, refetch]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="mb-4">An error occurred while fetching data. Please check your internet connection and try again.</p>
        <button
          onClick={() => refetch()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default Index;