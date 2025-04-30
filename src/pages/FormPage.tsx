import "./FormPage.css";
import { useState } from "react";
import TextInput from "../UI/Inputs/TextInput/TextInput";
import Button from "../UI/Button";
import Label from "../UI/Inputs/Label";
import DropDown from "../UI/Inputs/DropDown";
import ListBox from "../UI/Inputs/ListBox/ListBox";
import GroupedRadio from "../UI/Inputs/Group/GroupedRadio";
import GroupedCheckBox from "../UI/Inputs/Group/GroupedCheckBox";
import DatePicker from "../UI/Inputs/Datepicker";
import DynamicTabPanel from "../UI/Inputs/DynamicTabPanel/DynamicTabPanel";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'Apple', label: 'Apple' },
  { value: 'Banana', label: 'Banana' },
  { value: 'Orange', label: 'Orange' },
  { value: 'Grape', label: 'Grape' },
];

const radioOptions: Option[] = [
  { label: 'Light Theme', value: 'light' },
  { label: 'Dark Theme', value: 'dark' },
  { label: 'System Default', value: 'system' },
];

const checkboxOptions: Option[] = [
  { label: 'Project Alpha', value: 'alpha' },
  { label: 'Project Beta', value: 'beta' },
  { label: 'Project Gamma', value: 'gamma' },
  { label: 'Project Delta', value: 'delta' },
  { label: 'Project Epsilon', value: 'epsilon' },
  { label: 'Project Zeta', value: 'zeta' },
  { label: 'Project Eta', value: 'eta' },
  { label: 'Project Theta', value: 'theta' },
]

interface DynamicTabData {
  tabInputs: { [key: string]: string; };
  errors: { [key: string]: string; };
}

const FormPage = () => {
  const [value, setValue] = useState<string>('');
  const [selectedSingle, setSelectedSingle] = useState<Option | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<Option[]>([]);
  const [selectedList, setSelectedList] = useState<Option[]>([]);
  const [selectedRadio, setSelectedRadio] = useState<Option | null>(null);
  const [selectedCheckBoxes, setSelectedCheckBoxes] = useState<Option[] | null>(null);
  const [dob, setDob] = useState('');
  const [dynamicTabData, setDynamicTabData] = useState<DynamicTabData | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string | { [key: string]: string } }>({}); // Track form errors

  // Validate form inputs
  const validateForm = () => {
    const errors: { [key: string]: string | { [key: string]: string } } = {};

    if (!value.trim()) errors.name = "Full Name is required.";
    if (!selectedSingle) errors.singleSelect = "Please select a fruit.";
    if (selectedMulti.length === 0) errors.multiSelect = "Please select at least one fruit.";
    if (selectedList.length === 0) errors.listBox = "Please select a fruit from the list.";
    if (!selectedRadio) errors.radio = "Please select a theme.";
    if (!selectedCheckBoxes || selectedCheckBoxes.length === 0) errors.checkboxes = "Please select at least one category.";
    if (!dob) errors.dob = "Please select your Date of Birth.";

    console.log('validateForm', dynamicTabData)


    // DynamicTabPanel validation
    if (dynamicTabData?.tabInputs) {
      if (Object.keys(dynamicTabData.tabInputs).length !== selectedCheckBoxes?.length) {
        errors.dynamicTabData = 'Dynamic tabs must match selected checkboxes.';
      } else {
        const tabErrors: { [key: string]: string } = {};

        // Check each tab input for errors
        for (const [key, value] of Object.entries(dynamicTabData.tabInputs)) {
          if (!value || value.trim() === '') {
            tabErrors[key] = `Input for "${key}" cannot be empty.`;
          }
        }

        if (Object.keys(tabErrors).length > 0) {
          errors.dynamicTabInput = tabErrors; // Store errors in dynamicTabInput
        }
      }
    } else {
      console.log('rrr', selectedCheckBoxes?.length)
      //add logic of dynamicTabData is null
      if (selectedCheckBoxes && selectedCheckBoxes.length > 0) {
        errors.dynamicTabInput = 'Please fill out all dynamic tab fields.';
      }
    }

    console.log('errors', errors)
    setErrors(errors);

    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {

    if (validateForm()) {
      console.log('Form Data:');
      console.log('Full Name:', value);
      console.log('Single Select:', selectedSingle);
      console.log('Multi Select:', selectedMulti);
      console.log('List Box:', selectedList);
      console.log('Radio Option:', selectedRadio);
      console.log('Check Boxes:', selectedCheckBoxes);
      console.log('Date of Birth:', dob);
      console.log('DynamicTabData:', dynamicTabData);
    }
  };

  const handleRadioChange = (option: Option | null) => {
    setSelectedRadio(option);
  };

  const handleGroupedCheckBoxChange = (selected: Option[]) => {
    setSelectedCheckBoxes(selected);
  };

  const handleTabInputValueChange = (value: string, activeTab: string) => {
    console.log(`Tab ${activeTab} input changed to:`, value);
  };

  const handleValueChange = (data: { tabInputs: { [key: string]: string }; errors: { [key: string]: string } }) => {
    console.log('Dynamic Tab Panel Data:', data);
    setDynamicTabData(data)
  };

  return (
    <div className="page">
      <h1>Form</h1>
      {/* Full Name */}
      <div className="form-row">
        <Label htmlFor="name">Full Name</Label>
        <div>
          <TextInput
            id="name"
            value={value}
            onValueChange={(val) => setValue(val)}
            placeholder="Enter name"
            isValid={!errors.name}
          />
          {typeof errors.name === 'string' && <div className="error">{errors.name}</div>}
        </div>
      </div>

      {/* Single Select Dropdown */}
      <div className="form-row">
        <Label htmlFor="single-select">Single Select DD</Label>
        <div>
          <DropDown
            id="single-select"
            options={options}
            onChange={(values) => setSelectedSingle(values as Option)}
            placeholder="Select fruits"
            isValid={!errors.singleSelect}
          />
          {typeof errors.singleSelect === 'string' && <div className="error">{errors.singleSelect}</div>}
        </div>
      </div>

      {/* Multi Select Dropdown */}
      <div className="form-row">
        <Label htmlFor="multi-select">Multi Select DD</Label>
        <div>
          <DropDown
            id="multi-select"
            options={options}
            isMulti
            onChange={(values) => setSelectedMulti(values as Option[])}
            placeholder="Select fruits"
            isValid={!errors.multiSelect}
          />
          {typeof errors.multiSelect === 'string' && <div className="error">{errors.multiSelect}</div>}

        </div>
      </div>

      {/* List Box */}
      <div className="form-row">
        <Label htmlFor="list-box">List Box</Label>
        <div>
          <ListBox
            id="list-box"
            options={options}
            isMulti={true}
            onChange={(values) => setSelectedList(values as Option[])}
            height={180}
            width={"100%"}
            isValid={!errors.listBox}
          />
          {typeof errors.listBox === 'string' && <div className="error">{errors.listBox}</div>}

        </div>

      </div>

      {/* Grouped Radio */}
      <div className="form-row">
        <Label htmlFor="themeChoice">Grouped Radio</Label>
        <div>
          <GroupedRadio
            id="themeChoice"
            orientation="column"
            options={radioOptions}
            defaultSelected={'light'}
            onChange={handleRadioChange}
            isValid={!errors.radio}
          />
          {typeof errors.radio === 'string' && <div className="error">{errors.radio}</div>}
        </div>

      </div>

      {/* Grouped CheckBox */}
      <div className="form-row">
        <Label htmlFor="newsletter-options">Grouped CheckBox</Label>
        <div>
          <GroupedCheckBox
            id="newsletter-options"
            options={checkboxOptions}
            defaultSelected={['alpha', 'gamma']}
            onChange={handleGroupedCheckBoxChange}
            orientation="column"
            isValid={!errors.checkboxes}
          />
          {typeof errors.checkboxes === 'string' && <div className="error">{errors.checkboxes}</div>}
        </div>

      </div>

      {/* Date Picker */}
      <div className="form-row">
        <Label htmlFor="dob">Datepicker</Label>
        <div>
          <DatePicker
            id="dob"
            value={dob}
            onChange={setDob}
            minDate="2024-01-01"
            isValid={!errors.dob}
          />
          {typeof errors.dob === 'string' && <div className="error">{errors.dob}</div>}
        </div>
      </div>

      <div className="form-row">
        <Label htmlFor="dynamic-tabs">Dynamic Tabs</Label>
        <div>
          <DynamicTabPanel
            tabData={selectedCheckBoxes}
            onTabClose={(value) => console.log('Closed tab:', value)}
            onTabInputValueChange={handleTabInputValueChange}
            onValueChange={handleValueChange}
            id="dynamic-tabs"
            orientation="row"
            isValid={!errors.dynamicTabInput}
          />
          {/* Render dynamic tab errors if they exist */}
          {typeof errors.dynamicTabInput === 'object' && errors.dynamicTabInput !== null ? (
            Object.entries(errors.dynamicTabInput).map(([key, error]) => (
              <div className="error" key={key}>{error}</div>
            ))
          ) : typeof errors.dynamicTabInput === 'string' ? (
            <div className="error">{errors.dynamicTabInput}</div>
          ) : null}
        </div>
      </div>

      <div className="controls">
        <Button variant="contained" color="default" onClick={handleSubmit}>Save</Button>
        <Button variant="text" color="default" onClick={() => { }}>Cancel</Button>
      </div>
    </div>
  );
};

export default FormPage;
