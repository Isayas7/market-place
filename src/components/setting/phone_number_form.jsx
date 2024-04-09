import React from "react";

const PhoneNumberForm = () => {
  return (
    <div className="flex flex-col items-center py-6 space-y-4">
      <h1 className="text-xl  text-gray-800">Enter your phone number</h1>
      <div className="flex flex-row w-full justify-between">
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="Your phone number*"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-300 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 border border-green-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PhoneNumberForm;
