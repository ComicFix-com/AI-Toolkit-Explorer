import React from 'react';
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="Search AI tools by name or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default SearchBar;