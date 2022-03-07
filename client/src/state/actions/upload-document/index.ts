export const UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT';
export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
export const UPLOAD_DOCUMENT_FAILURE = 'UPLOAD_DOCUMENT_FAILURE';

export const uploadDocument = () => ({
  type: UPLOAD_DOCUMENT
});

export const uploadDocumentSuccess = (documentData: any) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  payload: documentData
});

export const uploadDocumentFailure = () => ({
  type: UPLOAD_DOCUMENT_FAILURE
});


