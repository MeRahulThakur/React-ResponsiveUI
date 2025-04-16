import React, { useState } from 'react';
import './Accordion.css';

type AccordionItem = {
  id: number;
  title: string;
  content: string;
};

const accordionItems: AccordionItem[] = [
  { id: 1, title: 'What is React?', content: 'React is a JavaScript library for building UIs.' },
];

const Accordion: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="expandable-container">
      {accordionItems.map((item) => {
        const isOpen = openId === item.id;
        const contentId = `accordion-content-${item.id}`;
        const headerId = `accordion-header-${item.id}`;

        return (
          <div key={item.id} className="accordion-item">
            <button
              className="accordion-header"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              id={headerId}
            >
              <span>{item.title}</span>
              <span className="chevron">{isOpen ? '▲' : '▼'}</span>
            </button>

            <div
              id={contentId}
              className={`accordion-content ${isOpen ? 'open' : ''}`}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
            >
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
