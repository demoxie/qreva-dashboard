import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';

const toNumber = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return parsed;
};

const AggregatorCommissionSettingsModal = ({
  isOpen,
  onClose,
  settings,
  isLoading,
  onSave,
  isSaving,
  title = 'Aggregator Commission Settings',
  subtitle = 'Configure percentage split from contract charges/commissions for uplines.',
  saveLabel = 'Save Settings',
  ownerType,
}) => {
  const [rules, setRules] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setRules([]);
      setError('');
      return;
    }
    setRules(
      (settings || []).map((rule) => ({
        ...rule,
        aggregatorPercent: toNumber(rule.aggregatorPercent),
        aggregatorManagerPercent: toNumber(rule.aggregatorManagerPercent),
      })),
    );
    setError('');
  }, [isOpen, settings]);

  const sortedRules = useMemo(() => {
    return [...rules].sort((a, b) => {
      if ((a.sourceType || '') === (b.sourceType || '')) {
        return String(a.code || '').localeCompare(String(b.code || ''));
      }
      return String(a.sourceType || '').localeCompare(String(b.sourceType || ''));
    });
  }, [rules]);

  const isOwnerAggregator = ownerType === 'aggregator';
  const isOwnerAggregatorManager = ownerType === 'aggregator_manager';
  const showAggregatorColumn = !ownerType || isOwnerAggregator;
  const showAggregatorManagerColumn = !ownerType || isOwnerAggregatorManager;

  if (!isOpen) return null;

  const updateRule = (key, field, value) => {
    setRules((prev) =>
      prev.map((rule) => {
        if (`${rule.code}:${rule.sourceType}` !== key) return rule;
        return {
          ...rule,
          [field]: value,
        };
      }),
    );
  };

  const handleSave = () => {
    const normalizedRules = rules.map((rule) => ({
      code: rule.code,
      sourceType: rule.sourceType,
      aggregatorPercent: showAggregatorColumn ? toNumber(rule.aggregatorPercent) : 0,
      aggregatorManagerPercent: showAggregatorManagerColumn ? toNumber(rule.aggregatorManagerPercent) : 0,
    }));
    for (const rule of normalizedRules) {
      if (showAggregatorColumn && (rule.aggregatorPercent < 0 || rule.aggregatorPercent > 100)) {
        setError(`Aggregator % for ${rule.code} must be between 0 and 100.`);
        return;
      }
      if (
        showAggregatorManagerColumn &&
        (rule.aggregatorManagerPercent < 0 || rule.aggregatorManagerPercent > 100)
      ) {
        setError(`Aggregator Manager % for ${rule.code} must be between 0 and 100.`);
        return;
      }
      if (
        showAggregatorColumn &&
        showAggregatorManagerColumn &&
        rule.aggregatorPercent + rule.aggregatorManagerPercent > 100
      ) {
        setError(`Combined % for ${rule.code} (${rule.sourceType}) cannot exceed 100.`);
        return;
      }
    }
    setError('');
    onSave({ rules: normalizedRules });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-[#E8EBED] px-6 py-4">
          <div>
            <h2 className="text-xl font-urbanist font-bold text-[#1E1E1E]">{title}</h2>
            <p className="text-sm text-[#808C91] font-general">
              {subtitle}
            </p>
          </div>
          <button onClick={onClose} className="text-[#808C91] hover:text-[#1E1E1E]">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-auto px-6 py-4">
          {isLoading ? (
            <div className="py-10 text-center text-sm text-[#808C91]">Loading settings...</div>
          ) : sortedRules.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#808C91]">No contract entries available yet.</div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#E8EBED]">
              <table className="min-w-full divide-y divide-[#E8EBED]">
                <thead className="bg-[#F8FAFB]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Source</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Scope</th>
                    {showAggregatorColumn ? (
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Aggregator %</th>
                    ) : null}
                    {showAggregatorManagerColumn ? (
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#808C91]">Agg. Manager %</th>
                    ) : null}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F4F6] bg-white">
                  {sortedRules.map((rule) => {
                    const key = `${rule.code}:${rule.sourceType}`;
                    return (
                      <tr key={key}>
                        <td className="px-4 py-3 text-sm font-medium text-[#1E1E1E]">{rule.code}</td>
                        <td className="px-4 py-3 text-sm text-[#1E1E1E]">{rule.name || rule.code}</td>
                        <td className="px-4 py-3 text-sm text-[#505C61] capitalize">{rule.sourceType}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              rule.source === 'override'
                                ? 'bg-[#E9F9EF] text-[#1B7D3C]'
                                : 'bg-[#F2F5F7] text-[#505C61]'
                            }`}
                          >
                            {rule.source === 'override' ? 'Personal Override' : 'Global'}
                          </span>
                        </td>
                        {showAggregatorColumn ? (
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
                              value={rule.aggregatorPercent}
                              onChange={(e) => updateRule(key, 'aggregatorPercent', e.target.value)}
                              className="w-28 rounded-lg border border-[#D9D9D9] px-3 py-2 text-sm focus:border-[#FF5B04] focus:outline-none"
                            />
                          </td>
                        ) : null}
                        {showAggregatorManagerColumn ? (
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
                              value={rule.aggregatorManagerPercent}
                              onChange={(e) => updateRule(key, 'aggregatorManagerPercent', e.target.value)}
                              className="w-28 rounded-lg border border-[#D9D9D9] px-3 py-2 text-sm focus:border-[#FF5B04] focus:outline-none"
                            />
                          </td>
                        ) : null}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#E8EBED] px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#D9D9D9] px-4 py-2 text-sm font-medium text-[#505C61] hover:bg-[#F8FAFB]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || isSaving}
            className="rounded-lg bg-[#FF5B04] px-5 py-2 text-sm font-semibold text-white hover:bg-[#E54F03] disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AggregatorCommissionSettingsModal;
