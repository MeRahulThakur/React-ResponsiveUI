import React, { useState } from 'react';
import './Accordion.css';

type AccordionItem = {
  id: number;
  title: string;
  content: string;
};

const accordionItems: AccordionItem[] = [
  { id: 1, title: 'What is ChatGPT?', content: 'ChatGPT is an AI developed by OpenAI.' }
];

const Accordion: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="expandable-container">
      {accordionItems.map((item) => (
        <div key={item.id} className="accordion-item">
          <button className="accordion-header" onClick={() => toggleItem(item.id)}>
            <span>{item.title}</span>
            <span className="chevron">{openId === item.id ? '▲' : '▼'}</span>
          </button>
          <div className={`accordion-content ${openId === item.id ? 'open' : ''}`}>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
