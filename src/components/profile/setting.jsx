import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PhoneNumberForm from "@/components/setting/phone_number_form";
import EmailChangeForm from "@/components/setting/change_email_form";

function Setting() {
  const [showPhoneNumberForm, setShowPhoneNumberForm] = useState(false);
  const [showEmailChangeForm, setShowEmailChangeForm] = useState(false);

  const handlePhoneNumberClick = () => {
    setShowPhoneNumberForm(!showPhoneNumberForm);
    setShowEmailChangeForm(false);
  };

  const handleEmailChangeClick = () => {
    setShowEmailChangeForm(!showEmailChangeForm);
    setShowPhoneNumberForm(false);
  };

  const handleCloseForms = () => {
    setShowPhoneNumberForm(false);
    setShowEmailChangeForm(false);
  };

  return (
    <div className="container mx-auto px-2 py-4 max-w-screen-lg flex">
      <Card className="flex-1 mb-6">
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center px-2 py-1 rounded">
              <i className="fas fa-envelope mr-2 text-gray-400"></i>
              Business Details
              <button className="ml-auto">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div
              className="flex items-center px-2 py-1 rounded cursor-pointer"
              onClick={handlePhoneNumberClick}
            >
              <i className="fas fa-plus-circle mr-2 text-gray-400"></i>
              Add phone number
            </div>
            <div
              className="flex items-center  px-2 py-1 rounded cursor-pointer"
              onClick={handleEmailChangeClick}
            >
              <i className="fas fa-envelope mr-2 text-gray-400"></i>
              Change email
            </div>
          </div>
        </CardContent>
      </Card>
      {showPhoneNumberForm && (
        <Card className="flex-1 mb-6">
          {" "}
          <CardContent>
            <PhoneNumberForm onClose={handleCloseForms} />
          </CardContent>
        </Card>
      )}
      {showEmailChangeForm && (
        <Card className="flex-1 mb-6">
          {" "}
          <CardContent>
            <EmailChangeForm onClose={handleCloseForms} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Setting;
