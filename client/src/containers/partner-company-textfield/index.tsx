import React from 'react';
import { connect } from 'react-redux';
import PartnerCompanyTextfield from '../../components/partner-company-textfield';
import { changePartnerCompany } from '../../state/actions/document';

interface Props {
  partnerCompany: string;
  changePartnerCompany: any;
}

const PartnerCompanyTextFieldContainer = ({
  partnerCompany,
  changePartnerCompany
}: Props) => {
  return (
    <PartnerCompanyTextfield partnerCompany={partnerCompany} changePartnerCompany={changePartnerCompany} />
  );
}

const mapStateToProps = (state: any) => ({
  partnerCompany: state.document.partnerCompany
});

const mapDispatchToProps = (dispatch: any) => ({
  changePartnerCompany: (event: any) => dispatch(changePartnerCompany(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerCompanyTextFieldContainer);