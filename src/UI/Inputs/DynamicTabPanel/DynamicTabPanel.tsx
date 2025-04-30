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
    if (!tabData) return;

    setTabs(tabData);

    setTabInputs(prev => {
      const updated = { ...prev };
      tabData.forEach(tab => {
        if (!(tab.value in updated)) {
          updated[tab.value] = '';
        }
      });
      return updated;
    });

    setErrors(prev => {
      const updated: { [key: string]: string } = {};
      tabData.forEach(tab => {
        if (prev[tab.value]) {
          updated[tab.value] = prev[tab.value];
        }
      });
      return updated;
    });

    setActiveTab(current => {
      if (!current || !tabData.find(tab => tab.value === current)) {
        return tabData[0]?.value || '';
      }
      return current;
    });

    // This is safe here because we're constructing new state
    onValueChange({
      tabInputs: tabData.reduce((acc, tab) => {
        acc[tab.value] = tabInputs[tab.value] ?? '';
        return acc;
      }, {} as { [key: string]: string }),
      errors: tabData.reduce((acc, tab) => {
        if (errors[tab.value]) acc[tab.value] = errors[tab.value];
        return acc;
      }, {} as { [key: string]: string }),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabData]);

  const handleTabClick = (value: string) => {
    setActiveTab(value);

    // If tabInputs is empty or doesn't contain the key, initialize it
    setTabInputs(prev => {
      if (Object.keys(prev).length === 0 || !(value in prev)) {
        return { ...prev, [value]: '' };
      }
      return prev;
    });
  };

  const handleTabClose = (value: string) => {
    const updatedTabInputs = { ...tabInputs };
    const updatedErrors = { ...errors };

    delete updatedTabInputs[value];
    delete updatedErrors[value];

    setTabs(prev => prev.filter(tab => tab.value !== value));
    setTabInputs(updatedTabInputs);
    setErrors(updatedErrors);

    if (activeTab === value && tabs.length > 1) {
      const nextTab = tabs.find(tab => tab.value !== value);
      setActiveTab(nextTab?.value || '');
    } else if (tabs.length === 1) {
      setActiveTab('');
    }

    onTabClose(value);

    // Defer onValueChange to avoid updating parent during render
    setTimeout(() => {
      onValueChange({
        tabInputs: updatedTabInputs,
        errors: updatedErrors,
      });
    }, 0);
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
