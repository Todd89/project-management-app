import './buttonAdd.css';

interface IButtonAddProps {
  handleAdd: () => void;
}

function ButtonAdd(props: IButtonAddProps) {
  return (
    <button className="button-add" onClick={props.handleAdd}>
      <span className="button-add_text">+</span>
    </button>
  );
}

export default ButtonAdd;
