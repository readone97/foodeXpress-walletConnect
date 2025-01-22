import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useWallet, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  const { publicKey, sendTransaction } = useWallet();

  // Solana connection
  const connection = new Connection("https://api.mainnet-beta.solana.com");

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
    if (!publicKey) {
      alert("Connect your wallet first!");
      return;
    }

    try {
      // Admin wallet public key (where payment will be sent)
      const adminWallet = new PublicKey("AdminWalletPublicKeyHere");

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
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="cart-section px-4 py-8">
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
                  src={`http://localhost:4000/images/${item.image}`}
                  alt={item.name}
                  className="w-12 h-12 rounded-md"
                />
              </td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  ❌
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
