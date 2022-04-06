export const createFileLink = (data: any, pinnedFile: any) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', pinnedFile);
  document.body.appendChild(link);
  link.click();
}