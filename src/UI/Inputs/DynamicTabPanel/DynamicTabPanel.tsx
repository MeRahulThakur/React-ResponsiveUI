import React, { useState, useEffect } from 'react';
import styles from './DynamicTabPanel.module.css';
import Button from '../../Button';
import TextInput from '../TextInput/TextInput';
import { useDebounce } from '../../../hooks/useDebounce';

type Tab = {
  label: string;
  value: string;
};

interface DynamicTabPanelProps {
  tabData: Tab[] | null;
  onTabClose: (value: string) => void;
  onTabInputValueChange: (value: string, activeTab: string) => void;
  onValueChange: (data: { tabInputs: { [key: string]: string }, errors: { [key: string]: string } }) => void;
  id?: string;
  orientation?: 'row' | 'column';
  isValid?: boolean;
}

const DynamicTabPanel: React.FC<DynamicTabPanelProps> = ({
  tabData,
  onTabClose,
  onTabInputValueChange,
  onValueChange,
  id,
  orientation = 'row',
  isValid = true,
}) => {
  const [tabs, setTabs] = useState<Tab[]>(tabData || []);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.value || '');
  const [tabInputs, setTabInputs] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const debouncedTabInputs = useDebounce(tabInputs, 300);
  const debouncedErrors = useDebounce(errors, 300);

  useEffect(() => {
    if (!tabData) return;

    setTabs(tabData);

    setTabInputs(prev => {
      const updated: { [key: string]: string } = {};
      // Keep only those in tabData
      tabData.forEach(tab => {
        updated[tab.value] = prev[tab.value] ?? '';
      });
      return updated;
    });

    setErrors(prev => {
      const updated: { [key: string]: string } = {};
      // Keep only those in tabData
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
  }, [tabData]);  

  useEffect(() => {
    onValueChange({
      tabInputs: debouncedTabInputs,
      errors: debouncedErrors,
    });
  }, [debouncedTabInputs, debouncedErrors, onValueChange]);

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
          <div className={styles.noTabs}>No Tabs</div>
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
              onBlur={handleInputBlur}
            />
            {errors[activeTab] && (
              <div className={styles.errorMessage}>{errors[activeTab]}</div>
            )}
          </>
        ) : (
          <div className={styles.selectPrompt}>Select a tab</div>
        )}
      </div>
    </div>
  );
};

export default DynamicTabPanel;
