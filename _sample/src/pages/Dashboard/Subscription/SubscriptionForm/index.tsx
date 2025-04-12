import React, { useState, useEffect } from 'react';

interface SubscriptionFormProps {
  subscription?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const SubscriptionForm = ({ subscription, onSubmit, onCancel }: SubscriptionFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceUSD: 0,
    priceBTC: 0,
    priceETH: 0,
    priceBNB: 0,
    pricePaystack: 0,
    apiRequestQuota: 0,
    isActive: true
  });

  useEffect(() => {
    if (subscription) {
      setFormData(subscription);
    }
  }, [subscription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">USD Price</label>
          <input
            type="number"
            value={formData.priceUSD}
            onChange={(e) => setFormData({...formData, priceUSD: parseFloat(e.target.value)})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">API Request Quota</label>
          <input
            type="number"
            value={formData.apiRequestQuota}
            onChange={(e) => setFormData({...formData, apiRequestQuota: parseInt(e.target.value)})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Crypto price inputs */}
        <div>
          <label className="block mb-2">BTC Price</label>
          <input
            type="number"
            step="0.00000001"
            value={formData.priceBTC}
            onChange={(e) => setFormData({...formData, priceBTC: parseFloat(e.target.value)})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">ETH Price</label>
          <input
            type="number"
            step="0.00000001"
            value={formData.priceETH}
            onChange={(e) => setFormData({...formData, priceETH: parseFloat(e.target.value)})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="col-span-2 flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {subscription ? 'Update' : 'Create'} Package
          </button>
        </div>
      </div>
    </form>
  );
};