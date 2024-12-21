//header.jsx
import React from 'react';


export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Notes App</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;