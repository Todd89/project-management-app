import './buttonAdd.css';

interface IButtonAddProps {
  buttonText: string;
  handleAdd: () => void;
}

function ButtonAdd(props: IButtonAddProps) {
  return (
    <button className="button-add" onClick={props.handleAdd}>
      {props.buttonText}
    </button>
  );
}

export default ButtonAdd;
