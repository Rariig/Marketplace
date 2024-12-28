import React from 'react';

const LandingPage = () => {
  return (
    <div
      className="flex items-start justify-start h-screen"
      style={{
        background: 'linear-gradient(to bottom, #650A0A 1%, #FFAE96 11%, #FFE4C6 16%)', // Replaced with valid color codes
      }}
    >
      <div className="pl-48 pt-40">
        <h1 className="text-[6rem] text-black" style={{ opacity: 0.92 }}>
          The world&apos;s
        </h1>
        <h1 className="text-[6rem] text-custom-dark-red pl-48 mt-[-3rem]">
          your play
        </h1>
      </div>
    </div>
  );
};


export default LandingPage;
