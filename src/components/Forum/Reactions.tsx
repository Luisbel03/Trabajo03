import React from 'react';
import { motion } from 'framer-motion';
import './Forum.css';

export interface Reaction {
  emoji: string;
  count: number;
}

interface ReactionsProps {
  reactions: Reaction[];
  onReact: (emoji: string) => void;
  size?: 'small' | 'normal';
}

const EMOJI_OPTIONS = ['👍', '❤️', '😂', '😮', '😢', '👎'];

const Reactions: React.FC<ReactionsProps> = ({
  reactions,
  onReact,
  size = 'normal'
}) => {
  return (
    <div className={`reactions-container ${size}`}>
      {EMOJI_OPTIONS.map((emoji) => {
        const reaction = reactions.find((r) => r.emoji === emoji);
        return (
          <motion.button
            key={emoji}
            className={`reaction-button ${reaction ? 'active' : ''}`}
            onClick={() => onReact(emoji)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="emoji">{emoji}</span>
            {reaction && <span className="count">{reaction.count}</span>}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Reactions; 