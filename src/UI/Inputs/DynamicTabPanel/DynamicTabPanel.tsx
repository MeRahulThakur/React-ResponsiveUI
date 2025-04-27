import React, { useState, useEffect, useRef } from 'react';
import styles from './DynamicTabPanel.module.css';
import Button from '../../Button';
import TextInput from '../TextInput/TextInput';

type Tab = {
  label: string;
  value: string;
};

interface DynamicTabPanelProps {
  tabData: Tab[];
  onTabClose: (value: string) => void;
  onTabInputValueChange: (value: string, activeTab: string) => void;
  onValueChange: (data: { tabInputs: { [key: string]: string }, errors: { [key: string]: string } }) => void;
  id?: string;
  orientation?: 'row' | 'column'; // Add orientation prop
}

const DynamicTabPanel: React.FC<DynamicTabPanelProps> = ({
  tabData,
  onTabClose,
  onTabInputValueChange,
  onValueChange,
  id,
  orientation = 'row' // Default orientation to row
}) => {
  const [tabs, setTabs] = useState<Tab[]>(tabData);
  const [activeTab, setActiveTab] = useState<string>(tabData[0]?.value || '');
  const [tabInputs, setTabInputs] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Create refs to manage auto-focus for each tab input
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | HTMLTextAreaElement | null }>({});

  useEffect(() => {
    // Auto-focus on the active tab input and move cursor to the end
    if (inputRefs.current[activeTab]) {
      const inputElement = inputRefs.current[activeTab];
      inputElement?.focus();
      inputElement?.setSelectionRange(inputElement.value.length, inputElement.value.length);
    }

    onValueChange({ tabInputs, errors }); // Log data whenever the component updates
  }, [tabInputs, errors, activeTab, onValueChange]);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  const handleTabClose = (value: string) => {
    setTabs(prev => prev.filter(tab => tab.value !== value));
    setTabInputs(prev => {
      const updated = { ...prev };
      delete updated[value];
      return updated;
    });
    setErrors(prev => {
      const updated = { ...prev };
      delete updated[value];
      return updated;
    });

    if (activeTab === value && tabs.length > 1) {
      const nextTab = tabs.find(tab => tab.value !== value);
      setActiveTab(nextTab?.value || '');
    } else if (tabs.length === 1) {
      setActiveTab('');
    }

    onTabClose(value); // Notify parent about tab closure
  };

  const validateInput = (value: string) => {
    if (value.trim() === '') {
      return 'This field cannot be empty.';
    }
    if (value.length > 200) {
      return 'Text exceeds maximum allowed length (200 characters).';
    }
    return '';
  };

  const handleInputChange = (value: string, text: string) => {
    setTabInputs(prev => ({ ...prev, [value]: text }));

    const error = validateInput(text);
    setErrors(prev => ({ ...prev, [value]: error }));

    onTabInputValueChange(text, value); // Notify parent about input change
  };

  return (
    <div className={`${styles.container} ${styles[orientation]}`} id={id}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        {tabs.length > 0 ? (
          tabs.map(tab => (
            <div
              key={tab.value}
              className={`${styles.tab} ${tab.value === activeTab ? styles.activeTab : ''}`}
              onClick={() => handleTabClick(tab.value)}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
              <div onClick={(e) => e.stopPropagation()}>
                <Button
                  onClick={() => handleTabClose(tab.value)}
                  variant="text"
                  size="sm"
                  ariaLabel={`Close ${tab.label}`}
                >
                  ×
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noTabs}>
            No Tabs
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab ? (
          <>
            <TextInput
              placeholder={`Write something for ${activeTab}`}
              value={tabInputs[activeTab] || ''}
              onValueChange={(value) => handleInputChange(activeTab, value)}
              isValid={!errors[activeTab]}
              required
              multiline
              rows={6}
              id={id ? `${id}-input-${activeTab}` : undefined} // Unique id for accessibility
              ref={(ref) => {
                if (ref) {
                  inputRefs.current[activeTab] = ref;
                }
              }}
            />
            {errors[activeTab] && (
              <div className={styles.errorMessage}>
                {errors[activeTab]}
              </div>
            )}
          </>
        ) : (
          <div className={styles.selectPrompt}>
            Select a tab
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicTabPanel;
