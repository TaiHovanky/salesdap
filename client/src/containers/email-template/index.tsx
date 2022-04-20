import React, { ChangeEvent } from 'react';
import EmailTemplate from '../../components/email-template';
import { connect } from 'react-redux';
import { updateEmailTemplate } from '../../state/actions/email-template';
import { showSuccess, showError, hideError, hideSuccess } from '../../state/actions/alert';

interface Props {
  duplicatesData: Array<any>;
  template: string;
  updateEmailTemplate: any;
  showSuccess: any;
  hideSuccess: any;
  showError: any;
  hideError: any;
}

const EmailTemplateContainer = ({
  duplicatesData,
  template,
  updateEmailTemplate,
  showSuccess,
  hideSuccess,
  showError,
  hideError
}: Props) => {
  const handleTemplateChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateEmailTemplate(event.target.value);
  }

  const handleCopyEmailTemplate = async () => {
    try {
      await navigator.clipboard.writeText(template);
      hideError();
      showSuccess('Copied email template');
      setTimeout(() => {
        hideSuccess();
      }, 5000);
    } catch (err) {
      showError('Failed to copy email template');
      setTimeout(() => {
        hideError();
      }, 5000);
    }
  };

  return (
    <EmailTemplate
      duplicatesData={duplicatesData}
      template={template}
      handleTemplateChange={handleTemplateChange}
      handleCopyEmailTemplate={handleCopyEmailTemplate}
    />
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData,
  template: state.emailTemplate.template
});

const mapDispatchToProps = (dispatch: any) => ({
  updateEmailTemplate: (value: string) => dispatch(updateEmailTemplate(value)),
  showSuccess: (successMsg: string) => dispatch(showSuccess(successMsg)),
  hideSuccess: () => dispatch(hideSuccess()),
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplateContainer);