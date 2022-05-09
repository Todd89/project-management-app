/* eslint-disable @typescript-eslint/no-explicit-any */
import './logaut.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUserStatus } from '../../../react/features/loginSlice';

const LogautButton: React.FC = () => {
  const userState = useSelector((state: any) => state.loginData);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(clearUserStatus('clear'));
          console.log(userState);
        }}
      >
        Logaut
      </button>
    </div>
  );
};

export default LogautButton;
