import { useState } from "react";
import TextInput from "../UI/Inputs/TextInput/TextInput";
import Button from "../UI/Button";
import Label from "../UI/Inputs/Label";
import DropDown from "../UI/Inputs/DropDown";
import ListBox from "../UI/Inputs/ListBox/ListBox";
import GroupedRadio from "../UI/Inputs/Group/GroupedRadio";
import GroupedCheckBox from "../UI/Inputs/Group/GroupedCheckBox";

import "./FormPage.css"

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
  { label: 'Tech', value: 'tech' },
  { label: 'Health', value: 'health' },
  { label: 'Finance', value: 'finance' },
]


const FormPage = () => {
  const [value,setValue] = useState<string>('')
  const [selectedSingle, setSelectedSingle] = useState<Option | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<Option[]>([]);
  const [selectedList, setSelectedList] = useState<Option[]>([]);
  const [selectedRadio, setSelectedRadio] = useState<Option|null>(null);
  const [selectedCheckBoxes, setSelectedCheckBoxes] = useState<Option[]|null>(null);

  const handleSubmit = () => {
    console.log('name-',value)
    console.log('selectedSingle-',selectedSingle)
    console.log('selectedMulti-',selectedMulti)
    console.log('selectedList-',selectedList)
    console.log('selectedRadio-',selectedRadio)
    console.log('selectedCheckBoxes-',selectedCheckBoxes)
  }

  const handleRadioChange = (option: Option | null) => {
    setSelectedRadio(option);
  };

  const handleGroupedCheckBoxChange = (selected: Option[]) => {
    //console.log('Selected checkboxes:', selected)
    setSelectedCheckBoxes(selected)
  }

  return (
    <>
      <div className="page">
      <h1>Form</h1>
      <div className="form-row">
        <Label htmlFor="name">Full Name</Label>
        <TextInput
          id="name"
          value={value}
          onValueChange={(val) => {console.log('val-',val);setValue(val)}}
          placeholder="Enter name"
          isValid={false}
        />
      </div>
      <div className="form-row">
        <Label htmlFor="single-select">Single Select DD</Label>
        <DropDown
          id="single-select"
          options={options}
          onChange={(values) => setSelectedSingle(values as Option)}
          placeholder="Select fruits"
          //defaultSelected="Apple"
          //isValid={false}
        />
      </div>
      <div className="form-row">
        <Label htmlFor="multi-select">Multi Select DD</Label>
        <DropDown
          id="multi-select"
          options={options}
          isMulti
          onChange={(values) => setSelectedMulti(values as Option[])}
          placeholder="Select fruits"
          defaultSelected={['Banana','Apple']}
        />
      </div>
      <div className="form-row">
        <Label htmlFor="list-box">List Box</Label>
        <ListBox
          id="list-box"
          options={options}
          isMulti={true}
          onChange={(values) => setSelectedList(values as Option[])}
          height={180}
          width={400}
          defaultSelected={'Grape'}
          //defaultSelected={['Grape','Orange']}
          //isValid={false}
        />
      </div>
      <div className="form-row">
        <Label htmlFor="themeChoice">Grouped Radio</Label>
        <GroupedRadio
          id="themeChoice"
          orientation="column"
          options={radioOptions}
          defaultSelected={'light'}
          onChange={handleRadioChange}
          //isValid={false}
        />
      </div>
      <div className="form-row">
        <Label htmlFor="newsletter-options">Grouped CheckBox</Label>
        <GroupedCheckBox
          id="newsletter-options"
          options={checkboxOptions}
          defaultSelected={['tech', 'finance']}
          onChange={handleGroupedCheckBoxChange}
          //isValid={false}
          orientation="column"
        />
      </div>
      <div className="controls">
        <Button variant="contained" color="default" type="submit" onClick={handleSubmit}>Save</Button>
        <Button variant="text" color="default" onClick={() => {}}>Cancel</Button>
      </div>
    </div>
    </>
  )
};

export default FormPage;
