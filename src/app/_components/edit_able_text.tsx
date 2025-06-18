import { useState } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
}

export default function EditableText({ value, onSave, className }: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

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

  return (
    <div onDoubleClick={handleDoubleClick} className={className}>
      {editing ? (
        <input
          autoFocus
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="px-2 py-1 w-full"
        />
      ) : (
        <span className="cursor-pointer">{text}</span>
      )}
    </div>
  );
}
