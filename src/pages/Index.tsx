import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ToolCard from '../components/ToolCard';
import ToolCardSkeleton from '../components/ToolCardSkeleton';
import SearchBar from '../components/SearchBar';

const toolsData = [
  {
    id: '1',
    name: 'gpt4-pdf-chatbot-langchain',
    description: 'GPT4 & LangChain Chatbot for large PDF docs.',
    url: 'https://github.com/mayooear/gpt4-pdf-chatbot-langchain',
    category: 'Open-source projects'
  },
  {
    id: '2',
    name: 'GPT-4 Chat UI',
    description: 'Replit GPT-4 frontend template for Next.js.',
    url: 'https://replit.com/@zahid/GPT-4-Chat-UI',
    category: 'Open-source projects'
  },
  {
    id: '3',
    name: 'GPT-Prompter',
    description: "Browser extension to get a fast prompt for OpenAI's GPT-3, GPT-4 & ChatGPT API.",
    url: 'https://github.com/giosilvi/GPT-Prompter',
    category: 'Open-source projects'
  },
  // Add more tools here...
];

const fetchTools = async () => {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return toolsData;
};

const Index = () => {
  const { data: tools, isLoading, error } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: fetchTools,
  });

  const [searchTerm, setSearchTerm] = React.useState('');

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