import React from 'react';
import { CreditCard, Wallet, Banknote, QrCode } from 'lucide-react';

const PaymentMode = () => {
  // Payment methods data
  const paymentMethods = [
    { name: "Credit Cards", icon: <CreditCard size={40} className="text-blue-600" />, types: ["Visa", "Mastercard", "Amex", "Rupay"] },
    { name: "Digital Wallets", icon: <Wallet size={40} className="text-purple-600" />, types: ["Paytm", "PhonePe", "Google Pay", "Amazon Pay"] },
    { name: "UPI", icon: <QrCode size={40} className="text-green-600" />, types: ["Any UPI App", "BHIM", "Paytm UPI", "PhonePe UPI"] },
    { name: "Net Banking", icon: <Banknote size={40} className="text-orange-600" />, types: ["All Major Banks", "Instant Transfer", "Secure Login"] }
  ];

  // Accreditation logos (replace with actual image paths)
  const accreditions = [
    { name: "PCI DSS Compliant", logo: "/logos/pci-dss.png" },
    { name: "ISO Certified", logo: "/logos/iso-certified.png" },
    { name: "IATA Approved", logo: "/logos/iata.png" },
    { name: "Ministry of Tourism", logo: "/logos/mot.png" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Payment Methods Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Secure Payment Options</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from multiple secure payment methods for hassle-free bookings
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">{method.name}</h3>
                <ul className="space-y-2 text-gray-600">
                  {method.types.map((type, i) => (
                    <li key={i} className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditation Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Accredited By</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {accreditions.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-16 w-32 flex items-center justify-center">
                  <img 
                    src={item.logo} 
                    alt={item.name} 
                    className="h-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-500 text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-green-50 px-6 py-3 rounded-full border border-green-200">
            <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-green-700 font-medium">100% Secure Payments | SSL Encrypted</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMode;