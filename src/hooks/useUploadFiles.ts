import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { FileUploadResponse, uploadFiles } from '@/api/hubspot/api';

type UploadFilesMutationOptions = UseMutationOptions<FileUploadResponse, Error, File[]>;

export const useUploadFiles = (options?: UploadFilesMutationOptions) => {
    return useMutation<FileUploadResponse, Error, File[]>({
        mutationFn: (files: File[]) => uploadFiles(files),

        onSuccess: (data, variables, context) => {
            console.log(`Uploaded ${data.success} of ${data.total} files.`);
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            console.error('Upload failed:', error.message);
            options?.onError?.(error, variables, context);
        },
        ...options, // Дозволяємо перевизначати або додавати опції зовні
    });
};
