import React from "react";

// import { Container } from './styles';

const Spinner: React.FC = () => {
  return (
    <div className="w-6 h-6 rounded-full bg-transparent border-white border-2 border-b-0 animate-spin"></div>
  );
};

export default Spinner;
