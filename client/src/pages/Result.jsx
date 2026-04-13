import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import axios from 'axios';

const Result = () => {
    const [image, setImage] = useState('');
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const { backendUrl, token, setShowLogin } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!input || input.trim() === '') return toast.error("Please enter a prompt");
        if (!token) return setShowLogin(true);

        setLoading(true);
        setIsImageLoaded(false);
        setImage('');

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/image/generate-image`,
                { prompt: input },
                { headers: { token } }
            );

            if (data.success) {
              console.log('image url:', data.image);
                setImage(data.image); 
            } else {
                toast.error(data.message || "Failed to generate image");
                setLoading(false); 
            }
        } catch (error) {
            toast.error(error.message);
            setLoading(false); 
        }
        
    };

    const handleDownload = () => {
        if (!image) return;
        const a = document.createElement('a');
        a.href = image;
        a.download = `ai-image-${Date.now()}.png`;
        a.click();
    };

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col min-h-[90vh] justify-center items-center'
        >
            
            <div className='relative mb-6 w-full max-w-sm'>

                
                {loading && !image && (
                    <div className='w-full h-64 bg-gray-100 rounded flex items-center justify-center'>
                        <p className='text-gray-400 text-sm'>Generating your image...</p>
                    </div>
                )}

                
                {image && (
                    <img
                        src={image}
                        alt="Generated"
                        className="w-full rounded"
                        referrerPolicy="no-referrer"
                        onLoad={() => {
                            setLoading(false);      
                            setIsImageLoaded(true);
                        }}
                        onError={() => {
                            setLoading(false);      
                            toast.error("Image failed to load");
                        }}
                    />
                )}

                
                {loading && (
                    <>
                        <div className='w-full mt-3 h-1 bg-gray-200 rounded-full overflow-hidden'>
                            <div
                                className='h-full bg-blue-600 rounded-full'
                                style={{ animation: 'loading 2s ease-in-out infinite' }}
                            />
                        </div>
                        <p className='text-center text-sm text-gray-400 mt-2'>
                            Generating your image, please wait...
                        </p>
                    </>
                )}
            </div>

            
            {!isImageLoaded && (
                <form onSubmit={onSubmitHandler} className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 rounded-full'>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe what you want to generate?"
                        className='flex-1 bg-transparent outline-none ml-6'
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className='bg-zinc-900 px-10 py-3 rounded-full disabled:opacity-50'
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </form>
            )}

            
            {isImageLoaded && (
                <div className='flex gap-4 mt-6'>
                    <button
                        onClick={() => { setIsImageLoaded(false); setInput(''); setImage(''); }}
                        className='border px-6 py-2 rounded-full'
                    >
                        Generate Another
                    </button>
                    <button onClick={handleDownload} className='bg-black text-white px-6 py-2 rounded-full'>
                        Download
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default Result;