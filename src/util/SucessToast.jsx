import { CheckCircle, X } from "lucide-react";

const SuccessToast = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 z-50">
    <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4 shadow-lg max-w-xs md:max-w-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 bg-green-50 rounded-lg p-1.5 inline-flex items-center justify-center text-green-500 hover:bg-green-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

export default SuccessToast;