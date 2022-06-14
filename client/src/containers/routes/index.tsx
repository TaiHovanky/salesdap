import Routes from '../../components/routes';
import { connect } from 'react-redux';
import { AlertState } from '../../state/reducers/alert';
import { UserState } from '../../state/reducers/user';
import { hideError, hideSuccess } from '../../state/actions/alert';
import { useEffect } from 'react';
import axios from 'axios';
import { setAccessToken } from '../../utils/access-token.utils';

interface Props {
  alert: AlertState;
  loading: boolean;
  user: UserState;
  hideError: any;
  hideSuccess: any;
}

const RoutesContainer = ({
  alert,
  loading,
  user,
  hideError,
  hideSuccess
}: Props) => {
  useEffect(() => {
    axios.post("http://localhost:3001/refresh_token", {
      credentials: "include"
    }).then((x: any) => {
      const { token } = x;
      setAccessToken(token);
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
  hideSuccess: () => dispatch(hideSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);
