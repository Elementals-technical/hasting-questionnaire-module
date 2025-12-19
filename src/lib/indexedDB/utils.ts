import { useMutation } from '@tanstack/react-query';
import { useIndexedDBValue } from '@/hooks/useIndexedDBValue';

export const useFileIndexedDBValue = () => {
    const indexedDB = useIndexedDBValue({
        name: 'hastings',
        version: 1,
        tables: ['files'] as const,
    });

    return indexedDB;
};

export const useSetFileToIndexedDB = () => {
    const indexedDB = useFileIndexedDBValue();

    return useMutation({
        mutationFn(newFile: File) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            return indexedDB.put('files', newFile);
        },
    });
};
