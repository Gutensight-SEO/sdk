// import React, { useState, useEffect } from 'react';

// interface PendingPayment {
//   id: string;
//   userId: string;
//   userEmail: string;
//   subscriptionId: string;
//   subscriptionName: string;
//   transactionHash: string;
//   amount: number;
//   currency: 'BTC' | 'ETH' | 'BNB';
//   createdAt: string;
// }

// export const PendingPayments = () => {
//   const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchPendingPayments();
//   }, []);

//   const fetchPendingPayments = async () => {
//     try {
//       const response = await fetch('/api/admin/payments/pending', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//         }
//       });
//       if (response.ok) {
//         setPendingPayments(await response.json());
//       }
//     } catch (error) {
//       console.error('Failed to fetch pending payments:', error);
//     }
//   };

//   const handleVerification = async (paymentId: string, isApproved: boolean) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/admin/payments/${paymentId}/verify`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//         },
//         body: JSON.stringify({ isApproved })
//       });

//       if (response.ok) {
//         fetchPendingPayments();
//       }
//     } catch (error) {
//       console.error('Failed to verify payment:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Pending Crypto Payments</h2>

//       <div className="space-y-4">
//         {pendingPayments.map(payment => (
//           <div key={payment.id} className="bg-white p-4 rounded-lg shadow">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600">User</p>
//                 <p>{payment.userEmail}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Subscription</p>
//                 <p>{payment.subscriptionName}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Amount</p>
//                 <p>{payment.amount} {payment.currency}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Transaction Hash</p>
//                 <p className="font-mono text-sm break-all">{payment.transactionHash}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Date</p>
//                 <p>{new Date(payment.createdAt).toLocaleString()}</p>
//               </div>
//             </div>

//             <div className="mt-4 flex justify-end space-x-4">
//               <button
//                 onClick={() => handleVerification(payment.id, false)}
//                 disabled={loading}
//                 className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
//               >
//                 Reject
//               </button>
//               <button
//                 onClick={() => handleVerification(payment.id, true)}
//                 disabled={loading}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Approve
//               </button>
//             </div>
//           </div>
//         ))}

//         {pendingPayments.length === 0 && (
//           <div className="text-center text-gray-500 py-8">
//             No pending payments to verify
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };