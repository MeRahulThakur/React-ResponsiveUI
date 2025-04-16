import Accordion from "../UI/Accordion/Accordion";
import Button from "../UI/Button";

const DesignSystemPage = () => (
  <div className="page">
    <h1>Design System</h1>
    <h2>Accordion</h2>
    <Accordion />
    <h2>Buttons</h2>
    <div style={{display:'flex', gap: '1rem'}}>
      <Button variant="contained" color="danger" onClick={() => {}}>Delete</Button>
      <Button variant="outlined" color="success" onClick={() => {}}>Success</Button>
      <Button variant="text" color="default" onClick={() => {}}>Cancel</Button>
      <Button variant="contained" color="default" onClick={() => {}} loading>Loading</Button>
    </div>
  </div>
);

export default DesignSystemPage;