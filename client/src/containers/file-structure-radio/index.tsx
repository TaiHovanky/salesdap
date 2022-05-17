import React from 'react';
import { connect } from 'react-redux';
import FileStructureRadio from '../../components/file-structure-radio';
import { setFileStructure } from '../../state/actions/document';

interface Props {
  fileStructure: string;
  setFileStructure: any;
  index: number;
}

const FileStructureRadioContainer = ({
  setFileStructure,
  fileStructure,
  index
}: Props) => {
  const handleFileStructureChange = (event: any, index: number) => {
    setFileStructure(index, event.target.value);
  }

  return (
    <FileStructureRadio
      handleFileStructureChange={handleFileStructureChange}
      fileStructure={fileStructure}
      index={index}
    />
  );
}

// const mapStateToProps = (state: any) => ({
//   fileStructure1: state.document.fileStructure1,
//   fileStructure2: state.document.fileStructure2,
// });

const mapDispatchToProps = (dispatch: any) => ({
  setFileStructure: (index: number, event: any) => dispatch(setFileStructure(index, event))
});

export default connect(null, mapDispatchToProps)(FileStructureRadioContainer);