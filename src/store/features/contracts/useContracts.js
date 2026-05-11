import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contractsApi } from '../../api/contracts-api';

export const useContracts = (params) => {
  return useQuery({
    queryKey: ['contracts', params],
    queryFn: () => contractsApi.listContracts(params),
  });
};

export const useContract = (contractId) => {
  return useQuery({
    queryKey: ['contracts', contractId],
    queryFn: () => contractsApi.getContract(contractId),
    enabled: !!contractId,
  });
};

export const useCreateContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contractsApi.createContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
  });
};

export const usePatchContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contractsApi.patchContract,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contracts', variables.contractId] });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
  });
};

export const usePatchAllContracts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contractsApi.patchAllContracts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
  });
};

export const useAggregatorCommissionSettings = (options = {}) => {
  return useQuery({
    queryKey: ['aggregator-commission-settings'],
    queryFn: () => contractsApi.getAggregatorCommissionSettings(),
    ...options,
  });
};

export const useUpdateAggregatorCommissionSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contractsApi.updateAggregatorCommissionSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aggregator-commission-settings'] });
    },
  });
};
