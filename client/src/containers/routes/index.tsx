import Routes from '../../components/routes';
import { connect } from 'react-redux';
import { AlertState } from '../../state/reducers/alert';
import { UserState } from '../../state/reducers/user';
import { hideError, hideSuccess } from '../../state/actions/alert';
import { useEffect } from 'react';
import axios from 'axios';
import { setAccessToken } from '../../utils/access-token.utils';
import { useHistory } from 'react-router-dom';
import { setIsLoading } from '../../state/actions/loading';
import { updateUser } from '../../state/actions/user';

interface Props {
  alert: AlertState;
  loading: boolean;
  user: UserState;
  hideError: any;
  hideSuccess: any;
  setIsLoading: any;
  updateUser: any;
}

const RoutesContainer = ({
  alert,
  loading,
  user,
  hideError,
  hideSuccess,
  setIsLoading,
  updateUser
}: Props) => {
  // const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    axios.post("http://localhost:3001/api/v1/refresh_token", {
      refreshToken: localStorage.getItem('sdtr')
    }).then((res: any) => {
      console.log('data', res.data);
      setAccessToken(res.data.token);
      localStorage.setItem('sdtr', res.data.refreshToken);
      hideError();
      updateUser(res.data);
      setIsLoading(false);
      // history.push('/home');
      // window.location.href = 'http://localhost:3000/home'
    });
  }, []);

  const handleAlertClose = () => {
    if (alert.alertType === 'error') {
      hideError();
    } else if (alert.alertType === 'success') {
      hideSuccess();
    }
  };

  return (
    <Routes
      alert={alert}
      loading={loading}
      user={user}
      handleAlertClose={handleAlertClose}
    />
  );
}

const mapStateToProps = (state: any) => ({
  alert: state.alert,
  loading: state.loading.isLoading,
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  hideError: () => dispatch(hideError()),
  hideSuccess: () => dispatch(hideSuccess()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  updateUser: (user: any) => dispatch(updateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);
