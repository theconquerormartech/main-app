"use client";

import { useUserFormData } from "@/lib/use-user-form-data";

export default function CheckoutPage() {
  const { formData, handleInputChange, isLoading, message, clearFormData } = useUserFormData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear the cookie after successful checkout
    clearFormData();
    
    alert(`Checkout completed!\nFirst Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading checkout data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Checkout
          </h2>
          <p className="mt-2 text-center text-sm">
            Review your information and complete your purchase
          </p>
        </div>
        
        {message && (
          <div className={`text-center text-sm p-3 rounded-md ${
            message.includes("loaded") 
              ? "bg-green-100 text-green-800" 
              : message.includes("Error") || message.includes("No previous")
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Enter your last name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md focus:outline-none transition duration-150 ease-in-out"
            >
              Complete Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
