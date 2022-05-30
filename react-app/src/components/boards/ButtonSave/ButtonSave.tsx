import './buttonSave.css';

interface IButtonSaveProps {
  handleSave: () => void;
}

function ManageButtons(props: IButtonSaveProps) {
  return <button className="button-save" onClick={props.handleSave}></button>;
}

export default ManageButtons;
