import React, { ChangeEvent } from 'react';
import EmailTemplate from '../../components/email-template';
import { connect } from 'react-redux';
import { updateEmailTemplate } from '../../state/actions/email-template';

interface Props {
  duplicatesData: Array<any>;
  template: string;
  updateEmailTemplate: any;
}

const EmailTemplateContainer = ({
  duplicatesData,
  template,
  updateEmailTemplate
}: Props) => {
  const handleTemplateChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateEmailTemplate(event.target.value);
  }

  return (
    <EmailTemplate
      duplicatesData={duplicatesData}
      template={template}
      handleTemplateChange={handleTemplateChange}
    />
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData,
  template: state.emailTemplate.template
});

const mapDispatchToProps = (dispatch: any) => ({
  updateEmailTemplate: (value: string) => dispatch(updateEmailTemplate(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplateContainer);