import React from 'react';

interface MentionProps {
  username: string;
  onClick?: () => void;
}

export default function Mention({ username, onClick }: MentionProps) {
  return (
    <button
      onClick={onClick}
      className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
    >
      @{username}
    </button>
  );
}