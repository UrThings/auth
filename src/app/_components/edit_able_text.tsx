import { useEffect, useState } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  placeholder?: string;
}

export default function EditableText({
  value,
  onSave,
  className,
  placeholder,
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    if (text !== value) {
      onSave(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditing(false);
      onSave(text);
    }
  };

  const isEmpty = !text.trim();

  return (
    <div onDoubleClick={handleDoubleClick} className={`group ${className ?? ''}`}>
      {editing ? (
        <input
          autoFocus
          type="text"
          value={text}
          placeholder={placeholder}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`
            rounded-md px-2 py-1 border 
            ${isEmpty ? 'w-24 h-8 text-gray-400' : 'border-transparent'}
          `}
        />
      ) : (
        <span
          className={`
            cursor-pointer transition inline-block
            ${isEmpty ? 'text-gray-400 border px-2 py-1 rounded-md w-24 h-8' : ''}
          `}
        >
          {isEmpty ? placeholder : text}
        </span>
      )}
    </div>
  );
}
