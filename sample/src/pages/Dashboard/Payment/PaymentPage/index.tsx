// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { PaystackButton } from 'react-paystack';

// export const PaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { plan } = location.state;
//   const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'crypto'>('paystack');
//   const [transactionHash, setTransactionHash] = useState('');

//   const handlePaystackSuccess = async (reference: any) => {
//     try {
//       const response = await fetch('/api/payments/verify-paystack', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ reference, planId: plan.id })
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         navigate('/payment/success', { state: { subscription: data } });
//       }
//     } catch (error) {
//       console.error('Payment verification failed:', error);
//     }
//   };

//   const handleCryptoSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/payments/verify-crypto', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ 
//           transactionHash,
//           planId: plan.id
//         })
//       });
      
//       if (response.ok) {
//         navigate('/payment/pending', { 
//           state: { message: 'Transaction hash submitted successfully' }
//         });
//       }
//     } catch (error) {
//       console.error('Crypto submission failed:', error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Payment for {plan.name}</h2>
      
//       <div className="mb-6">
//         <label className="block mb-2">Select Payment Method</label>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value as 'paystack' | 'crypto')}
//           className="w-full p-2 border rounded"
//         >
//           <option value="paystack">Paystack</option>
//           <option value="crypto">Cryptocurrency</option>
//         </select>
//       </div>

//       {paymentMethod === 'paystack' ? (
//         <PaystackButton
//           text="Pay with Paystack"
//           amount={plan.pricePaystack * 100} // Convert to kobo
//           publicKey={process.env.REACT_APP_PAYSTACK_PUBLIC_KEY!}
//           className="w-full bg-green-600 text-white py-2 rounded"
//           onSuccess={handlePaystackSuccess}
//         />
//       ) : (
//         <div className="space-y-4">
//           <div className="border p-4 rounded">
//             <p>BTC Amount: {plan.priceBTC}</p>
//             <p>ETH Amount: {plan.priceETH}</p>
//             <p>BNB Amount: {plan.priceBNB}</p>
//             <p className="text-sm text-gray-600 mt-2">
//               Send the exact amount to the corresponding address and submit the transaction hash below
//             </p>
//           </div>
          
//           <form onSubmit={handleCryptoSubmit}>
//             <input
//               type="text"
//               value={transactionHash}
//               onChange={(e) => setTransactionHash(e.target.value)}
//               placeholder="Enter Transaction Hash"
//               className="w-full p-2 border rounded mb-4"
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded"
//             >
//               Submit Transaction Hash
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };