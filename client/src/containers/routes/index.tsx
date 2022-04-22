import Routes from '../../components/routes';
import { connect } from 'react-redux';
import { AlertState } from '../../state/reducers/alert';
import { UserState } from '../../state/reducers/user';
import { hideError, hideSuccess } from '../../state/actions/alert';

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
  return (
    <Routes
      alert={alert}
      loading={loading}
      user={user}
      hideError={hideError}
      hideSuccess={hideSuccess}
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
