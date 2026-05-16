import { useMemo, useState } from 'react';
import AggregatorCommissionSettingsModal from '@/components/modals/AggregatorCommissionSettingsModal';
import {
  useAggregatorCommissionSettings,
  useUpdateAggregatorCommissionSettings,
} from '@/store/features/contracts/useContracts';

const CommissionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: settingsResponse, isLoading, refetch } = useAggregatorCommissionSettings();
  const updateSettings = useUpdateAggregatorCommissionSettings();

  const rules = useMemo(() => settingsResponse?.data?.rules || [], [settingsResponse]);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1E]">Commission Management</h1>
          <p className="mt-1 text-[#808C91]">
            Configure global commission share for Aggregator and Aggregator Manager across all services.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="h-12 rounded-lg bg-[#FF5B04] px-8 text-sm font-semibold text-white hover:bg-[#E54F03]"
        >
          Update Global Settings
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E8EBED] bg-white">
        <div className="border-b border-[#E8EBED] px-5 py-4">
          <h2 className="text-lg font-semibold text-[#1E1E1E]">Global Rules</h2>
        </div>
        <div className="max-h-[70vh] overflow-auto">
          {isLoading ? (
            <div className="px-5 py-8 text-sm text-[#808C91]">Loading commission rules...</div>
          ) : rules.length === 0 ? (
            <div className="px-5 py-8 text-sm text-[#808C91]">
              No contract-based commission rules found.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-[#E8EBED]">
              <thead className="bg-[#F8FAFB]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Aggregator %</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Agg. Manager %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F4F6] bg-white">
                {rules.map((rule) => (
                  <tr key={`${rule.code}:${rule.sourceType}`}>
                    <td className="px-4 py-3 text-sm font-medium text-[#1E1E1E]">{rule.code}</td>
                    <td className="px-4 py-3 text-sm text-[#1E1E1E]">{rule.name || rule.code}</td>
                    <td className="px-4 py-3 text-sm capitalize text-[#505C61]">{rule.sourceType}</td>
                    <td className="px-4 py-3 text-sm text-[#1E1E1E]">{Number(rule.aggregatorPercent || 0)}%</td>
                    <td className="px-4 py-3 text-sm text-[#1E1E1E]">{Number(rule.aggregatorManagerPercent || 0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <AggregatorCommissionSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        settings={rules}
        isLoading={isLoading}
        isSaving={updateSettings.isPending}
        title="Global Aggregator Commission Settings"
        subtitle="This controls default upline split for all aggregators and aggregator managers."
        onSave={(payload) => {
          updateSettings.mutate(payload, {
            onSuccess: () => {
              setIsModalOpen(false);
              refetch();
            },
          });
        }}
      />
    </div>
  );
};

export default CommissionManagement;
