import Routes from '../../components/routes';
import { connect } from 'react-redux';
import { AlertState } from '../../state/reducers/alert';
import { UserState } from '../../state/reducers/user';

interface Props {
  alert: AlertState;
  loading: boolean;
  user: UserState;
}

const RoutesContainer = ({ alert, loading, user }: Props) => {
  return (
    <Routes alert={alert} loading={loading} user={user} />
  );
}

const mapStateToProps = (state: any) => ({
  alert: state.alert,
  loading: state.loading.isLoading,
  user: state.user
});

export default connect(mapStateToProps)(RoutesContainer);
