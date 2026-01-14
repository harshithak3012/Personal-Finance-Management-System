import React from 'react';

const BrandTitle = ({ size = 'text-2xl md:text-3xl', showUnderline = true }) => {
  return (
    <div className="pt-1">
      <h1
        className={`
          ${size}
          font-semibold
          tracking-tight
          bg-gradient-to-r
          from-[#0B1D3A]
          via-[#1E40AF]
          to-[#4F83FF]
          bg-clip-text
          text-transparent
        `}
      >
        Expense Tracker
      </h1>

      {showUnderline && (
        <div className="
          mt-1
          h-1
          w-24
          bg-gradient-to-r
          from-[#1E40AF]
          to-[#7AA2FF]
          rounded-full
        " />
      )}
    </div>
  );
};

export default BrandTitle;
