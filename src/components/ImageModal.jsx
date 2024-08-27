import React from 'react';

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-4 rounded-lg max-w-xl max-h-full overflow-auto">
                <img src={imageUrl} alt="Full Size" className="object-contain w-full h-auto" />
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
    Close
</button>

                <a href={imageUrl} download className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Download
                </a>
            </div>
        </div>
    );
};

export default ImageModal;
