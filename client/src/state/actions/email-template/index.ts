export const UPDATE_EMAIL_TEMPLATE = 'UPDATE_EMAIL_TEMPLATE';

export const updateEmailTemplate = (updatedTemplate: string) => ({
  type: UPDATE_EMAIL_TEMPLATE,
  payload: updatedTemplate
});