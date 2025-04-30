import React, { useState, useEffect } from 'react';
import styles from './DynamicTabPanel.module.css';
import Button from '../../Button';
import TextInput from '../TextInput/TextInput';

type Tab = {
  label: string;
  value: string;
};

interface DynamicTabPanelProps {
  tabData: Tab[] | null; // Allow null
  onTabClose: (value: string) => void;
  onTabInputValueChange: (value: string, activeTab: string) => void;
  onValueChange: (data: { tabInputs: { [key: string]: string }, errors: { [key: string]: string } }) => void;
  id?: string;
  orientation?: 'row' | 'column'; // Add orientation prop
  isValid?: boolean;  // New isValid prop
}

const DynamicTabPanel: React.FC<DynamicTabPanelProps> = ({
  tabData,
  onTabClose,
  onTabInputValueChange,
  onValueChange,
  id,
  orientation = 'row', // Default orientation to row
  isValid = true,  // Default isValid to true
}) => {
  const [tabs, setTabs] = useState<Tab[]>(tabData || []);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.value || '');
  const [tabInputs, setTabInputs] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setTabs(tabData || []);
  }, [tabData]);

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

  // Handle blur event to call onValueChange when the input loses focus (clicking outside)
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    
    // Update tabInputs with latest value
    const updatedTabInputs = { ...tabInputs, [activeTab]: inputValue };
  
    // Validate and update errors
    const error = validateInput(inputValue);
    const updatedErrors = { ...errors, [activeTab]: error };
  
    setTabInputs(updatedTabInputs);
    setErrors(updatedErrors);
  
    // Notify parent with latest tabInputs and errors
    onValueChange({
      tabInputs: updatedTabInputs,
      errors: updatedErrors,
    });
  };

  return (
    <div className={`${styles.container} ${!isValid && styles.invalid} ${styles[orientation]}`} id={id}>
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
              id={id ? `${id}-input-${activeTab}` : undefined}
              onBlur={handleInputBlur} // Call onValueChange when input loses focus
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
