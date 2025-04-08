import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFollow = () => {
    const queryClient = useQueryClient();
    
    const {mutate:follow, isPending} = useMutation({
        mutationFn: async (userId) => {
        try {
            const res = await fetch(`/api/users/follow/${userId}`, {
                method: 'POST',})
                const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong!')
            }
            return data;
        } catch (error) {
            toast.error('Error following user');
            throw new Error(error.message || 'Something went wrong!');
        }
    },
    onSuccess: () => {
        Promise.all([

            queryClient.invalidateQueries(['suggestedUsers']),
            queryClient.invalidateQueries(['authUser'])
        ])
        toast.success('Followed successfully!');
    },
    onError: (error) => {
        toast.error(error.message || 'Something went wrong!');
    },
});
    return {follow, isPending}
}

export default useFollow;