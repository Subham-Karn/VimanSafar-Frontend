import { AlertCircle, X } from "lucide-react";

const ErrorToast = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 z-50">
    <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 shadow-lg max-w-xs md:max-w-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 bg-red-50 rounded-lg p-1.5 inline-flex items-center justify-center text-red-500 hover:bg-red-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

export default ErrorToast;