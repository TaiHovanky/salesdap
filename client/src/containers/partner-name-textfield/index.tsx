import React from 'react';
import { connect } from 'react-redux';
import PartnerNameTextfield from '../../components/partner-name-textfield';
import { changePartnerName } from '../../state/actions/document';

interface Props {
  partnerName: string;
  changePartnerName: any;
}

const PartnerNameTextFieldContainer = ({
  partnerName,
  changePartnerName
}: Props) => {
  return (
    <PartnerNameTextfield partnerName={partnerName} changePartnerName={changePartnerName} />
  );
}

const mapStateToProps = (state: any) => ({
  partnerName: state.document.partnerName
});

const mapDispatchToProps = (dispatch: any) => ({
  changePartnerName: (event: any) => dispatch(changePartnerName(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerNameTextFieldContainer);