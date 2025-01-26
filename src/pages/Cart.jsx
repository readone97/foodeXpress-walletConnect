import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { food_list } from '../mockDatabase';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(StoreContext);
  const { address } = useAppKitAccount();
  const { connection } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider('solana');

  // Calculate the cart details
  const cartDetails = Object.entries(cartItems).map(([id, quantity]) => {
    const item = food_list.find((food) => food._id === id);
    if (!item) throw new Error(`Food item with ID ${id} not found`);
    return { ...item, quantity };
  });

  // Calculate total price
  const total = cartDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle payment
  const handlePayment = async () => {
    if (!address) {
      alert('Connect your wallet first!');
      return;
    }

    try {
      // Admin wallet public key (where payment will be sent)
      const adminWallet = new PublicKey('AdminWalletPublicKeyHere');

      // Convert total price to lamports
      const lamports = total * LAMPORTS_PER_SOL;

      // Create the transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: adminWallet,
          lamports,
        })
      );

      // Send the transaction
      const signature = await sendTransaction(transaction, connection);
      alert(`Payment Successful! Transaction Signature: ${signature}`);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-dvh mt-20 px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4">Quantity</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails.map((item, index) => (
            <tr key={item._id} className="border-b">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-md"
                />
              </td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="flex items-center gap-3 px-6 py-4">
                <button
                  title="Increase Quantity"
                  onClick={() => addToCart(id)}
                  className="bg-green-600 hover:bg-green-800 text-white py-2 px-3 rounded-lg"
                >
                  +
                </button>
                <button
                  title={
                    item.quantity > 1 ? 'Decrease Quantity' : 'Remove Item'
                  }
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-600 hover:text-red-800 text-white py-2 px-3 rounded-lg"
                >
                  {item.quantity > 1 ? '-' : '❌'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex flex-col items-end">
        <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
        <div className="mt-4 flex items-center gap-4">
          <WalletMultiButton />
          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
