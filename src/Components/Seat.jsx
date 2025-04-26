import React, { useState, useRef } from 'react';
import { FaChair } from 'react-icons/fa';

function Seat({ seat }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const divRef = useRef(null);
    const [color, setColor] = useState('bg-blue-200');

    const handleClick = () => {
        setShowTooltip(!showTooltip);
    };

    const handleOutsideClick = (event) => {
        // Close the tooltip if the click is outside the div and tooltip
        if (divRef.current && !divRef.current.contains(event.target) && !event.target.closest('.tooltip')) {
            setShowTooltip(false);
        }
    };

    // Add event listener for outside clicks
    React.useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const onSeatSelected = (seat) => {
        setColor('bg-green-200');
        setShowTooltip(false);
    }

    const onUnSeatSelected = () => {

        setColor('bg-blue-200');
        setShowTooltip(false);
    }

    return (
        <div style={{ position: 'relative' }}>

            {seat.available ? (
                <div
                    onClick={handleClick}
                    ref={divRef}
                    className={`p-1 ${color} rounded-xl cursor-pointer hover:bg-blue-300 transition duration-300 ease-in-out flex flex-col justify-center items-center`}
                    style={{ width: '60px', margin: '0 auto' }}
                >
                    <FaChair size={40} color="black" />
                    <div className="text-center">
                        <div className="font-bold text-sm">{seat.code}</div>
                    </div>
                </div>
            ) : (
                <p></p>
            )}
            {showTooltip && (
                <div
                    className="tooltip shadow-neutral-400 rounded-4xl bg-white text-black absolute text-left"
                    style={{
                        position: 'absolute',
                        top: '-120px', // Position above the div
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '10px',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        zIndex: '1000',
                        textAlign: 'center',
                        width: '250px',
                        height: '120px',

                    }}
                >
                    <div>

                        <div className="font-bold text-sm">{seat.code + '-' + seat.storefrontSlotCode}</div>
                        <div className="text-sm font-bold"> Cost: {seat?.prices?.alternatives[0][0].amount + '/' + seat?.prices?.alternatives[0][0].currency}</div>
                    </div>

                    <div className=''
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                        }}
                    >
                        <button
                            onClick={onUnSeatSelected}
                            className="p-2 bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                        >
                            Un-Select
                        </button>
                        &nbsp;
                        <button
                            onClick={() => onSeatSelected(seat)}
                            className=" bg-green-300 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-300"
                        >
                            Select Seat
                        </button>
                    </div>
                    <div
                        className="tooltip-arrow"
                        style={{
                            position: 'absolute',
                            bottom: '-10px', // Position the arrow below the tooltip
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: '10px solid #f9f9f9', // Match the tooltip background color
                        }}
                    ></div>
                </div>
            )
            }
        </div >
    );
}

export default Seat;