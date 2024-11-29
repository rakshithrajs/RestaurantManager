import { useEffect } from "react";

const PaymentDone = ({ setVisible }) => {
    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 3000); // Increased timeout for better user experience
        return () => clearTimeout();
    }, [setVisible]);

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-50">
            <div className="bg-white p-8 md:w-96 rounded-xl shadow-lg transform transition-all duration-300 scale-95 hover:scale-100">
                <svg
                    viewBox="0 0 24 24"
                    className="text-green-500 w-20 h-20 mx-auto mb-4 animate-pulse"
                >
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        Payment Successful!
                    </h3>
                    <p className="text-gray-700 mb-4">
                        Your payment has been processed securely. Thank you for
                        your purchase!
                    </p>
                    <p className="text-gray-500">Enjoy your day!</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentDone;
