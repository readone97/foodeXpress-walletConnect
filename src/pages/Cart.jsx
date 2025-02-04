import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { Report } from 'notiflix';
import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { food_list } from '../mockDatabase';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } =
    useContext(StoreContext);
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

  // Function to fetch SOL price
  const getSolPrice = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
      );
      const data = await response.json();
      return data.solana.usd;
    } catch (error) {
      console.error('Error fetching SOL price:', error);
      throw new Error('Failed to fetch SOL price');
    }
  };

  // Handle payment
  const handlePayment = async () => {
    if (!address) {
      alert('Connect your wallet first!');
      return;
    }

    try {
      // Get current SOL price
      const solPrice = await getSolPrice();
      const amountInSol = total / solPrice;
      const lamports = Math.round(amountInSol * LAMPORTS_PER_SOL);

      // Get the latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();

      const tx = new Transaction({
        blockhash,
        lastValidBlockHeight: await connection.getBlockHeight(),
        feePayer: new PublicKey(address),
      }).add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: new PublicKey(
            '6oL9Lq3jBinKnCnPanXp9D7VbDgyRQru9BShKbbcg3se'
          ),
          lamports,
        })
      );

      await walletProvider.signAndSendTransaction(tx);

      // Clear the cart
      clearCart();

      Report.success(
        'Payment Successful!',
        `Paid $${total} (${amountInSol.toFixed(4)} SOL)`
      );
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  if (cartDetails.length === 0) {
    return (
      <div className="min-h-dvh mt-20 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">
            Your cart is empty
          </h2>
          <p className="text-gray-600">
            Add some delicious items to your cart!
          </p>
          <a
            href="/#menu"
            className="inline-block mt-4 px-6 py-3 bg-customYellow text-white rounded-lg
                     hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300"
          >
            Browse Menu
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh mt-20 px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Cart
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-max table-fixed">
            <thead>
              <tr className="bg-customYellow text-white">
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Item</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Quantity</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartDetails.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 max-w-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-semibold">{item.quantity}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addToCart(item._id)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg
                                 transition-all duration-200 hover:scale-105"
                        title="Increase Quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg
                                 transition-all duration-200 hover:scale-105"
                        title={
                          item.quantity > 1
                            ? 'Decrease Quantity'
                            : 'Remove Item'
                        }
                      >
                        {item.quantity > 1 ? '-' : '🗑️'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-2xl font-bold text-customYellow">
              ${total.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handlePayment}
            className="bg-customYellow text-white px-8 py-3 rounded-lg
                     hover:bg-yellow-500 transform hover:scale-105 
                     transition-all duration-300 font-semibold
                     focus:ring-2 focus:ring-yellow-300 focus:outline-none"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
