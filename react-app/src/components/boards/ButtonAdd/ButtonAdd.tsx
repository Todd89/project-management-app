import './buttonAdd.css';

interface IButtonAddProps {
  handleAdd: () => void;
}

function ButtonAdd(props: IButtonAddProps) {
  return <button className="button-add" onClick={props.handleAdd}></button>;
}

export default ButtonAdd;
