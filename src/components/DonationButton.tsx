import React from 'react';
import { Button } from "@/components/ui/button";

const DonationButton: React.FC = () => {
  const handleDonation = () => {
    const upiLink = "upi://pay?pa=adnanmuhammad4393@okicici&pn=Adnan+Muhammad&am=199&tn=supporting+the+AI+Toolkit+Explorer";
    window.location.href = upiLink;
  };

  return (
    <Button onClick={handleDonation} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
      Donate ₹199 to Support
    </Button>
  );
};

export default DonationButton;