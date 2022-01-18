export interface HookArgs {
  onUpload(): Promise<unknown>;
  onDelete?(): Promise<unknown>;
  onPreview?(): Promise<unknown>;
}

const useUploadData = (options: HookArgs) => {
  const { onUpload } = options;

  const beforeUpload = (files: File[]) => {
    if (!files.length) throw new Error(`No files to upload`);
  };
};

export default useUploadData;
