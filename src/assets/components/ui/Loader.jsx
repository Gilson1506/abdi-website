import React from 'react';

export default function Loader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <img src="/logo2.png" alt="ABDI" className="h-10 w-10 animate-pulse" />
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}


