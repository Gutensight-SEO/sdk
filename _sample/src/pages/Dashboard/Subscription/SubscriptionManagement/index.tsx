import React, { useState, useEffect } from 'react';
import { SubscriptionForm } from './SubscriptionForm.ts';

interface Subscription {
  id: string;
  name: string;
  priceUSD: number;
  priceBTC: number;
  priceETH: number;
  priceBNB: number;
  pricePaystack: number;
  apiRequestQuota: number;
  isActive: boolean;
}

export const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/admin/subscriptions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (response.ok) {
        setSubscriptions(await response.json());
      }
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    }
  };

  const handleUpdate = async (subscription: Subscription) => {
    try {
      const response = await fetch(`/api/admin/subscriptions/${subscription.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(subscription)
      });
      if (response.ok) {
        fetchSubscriptions();
        setShowForm(false);
        setEditingSubscription(null);
      }
    } catch (error) {
      console.error('Failed to update subscription:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Subscription Packages</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Package
        </button>
      </div>

      {showForm && (
        <SubscriptionForm
          subscription={editingSubscription}
          onSubmit={handleUpdate}
          onCancel={() => {
            setShowForm(false);
            setEditingSubscription(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 gap-4">
        {subscriptions.map(subscription => (
          <div key={subscription.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{subscription.name}</h3>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingSubscription(subscription);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>USD Price: ${subscription.priceUSD}</div>
              <div>API Quota: {subscription.apiRequestQuota}</div>
              <div>BTC Price: {subscription.priceBTC}</div>
              <div>ETH Price: {subscription.priceETH}</div>
              <div>BNB Price: {subscription.priceBNB}</div>
              <div>Status: {subscription.isActive ? 'Active' : 'Inactive'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};