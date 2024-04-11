import React from "react";

const EmailChangeForm = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onClose();
  };

  return (
    <div className="flex flex-col items-center py-6 space-y-4">
      <h1 className="text-xl  text-gray-800">Change your email address</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="email"
          id="newEmail"
          name="newEmail"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1  focus:ring-green-500 w-full"
          placeholder="Enter your new email address"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-300 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 border border-green-300"
        >
          Change Email
        </button>
      </form>
    </div>
  );
};

export default EmailChangeForm;
