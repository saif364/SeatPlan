import React, { useState, useRef } from 'react';
import { FaChair } from 'react-icons/fa';
import { useGlobalStyles } from '../contexts/GlobalStylesContext';




function Seat({ seat, isSelected, onSelect, isUnavailable }) {
    const { globalStyles } = useGlobalStyles();
    const [showTooltip, setShowTooltip] = useState(false);
    const divRef = useRef(null);
    const [seatType, setSeatType] = useState('');

    const color = isSelected ? 'bg-green-200' : seat.available ? 'bg-blue-200' : '';
    const unavailableColor = isUnavailable ? 'bg-gray-300' : '';


    const handleClick = () => {


        setSeat();
        setShowTooltip(!showTooltip);
    };

    const setSeat = () => {
        var seatTypeStr = "";
        seat?.rawSeatCharacteristics.map((type) => {
            if (type == "W") {
                seatTypeStr += "Window Seat, "
            }
            else if (type == "A") {
                seatTypeStr += "Aisle Seat, "
            }
            else if (type == "9") {
                seatTypeStr += "Center Seat, "
            }

            if (type === "CH") {
                seatTypeStr += "Child Seat, ";
            }
            if (type === "RS") {
                seatTypeStr += "Reserved Seat, ";
            }
            if (type === "FC") {
                seatTypeStr += "First Class Seat, ";
            }
            if (type === "LS") {
                seatTypeStr += "Luxury Seat, ";
            }
        })

        setSeatType(seatTypeStr);
    }

    const handleOutsideClick = (event) => {
        if (divRef.current && !divRef.current.contains(event.target) && !event.target.closest('.tooltip')) {
            setShowTooltip(false);
        }
    };


    React.useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const onSeatSelected = () => {

        if (seat.available) {
            onSelect(seat.code);
        }

    }



    return (
        <div className={`   ${globalStyles.shadowrounded} `} style={{ position: 'relative' }}>

            {

                seat.available ? (
                    <div
                        onClick={handleClick}
                        ref={divRef}
                        className={`p-1 ${color} rounded-xl cursor-pointer hover:bg-blue-300 transition duration-300 ease-in-out flex flex-col justify-center items-center`}
                        style={{ width: '60px', margin: '0 auto' }}
                    >
                        <FaChair size={40} />
                        <div className="text-center">
                            <div className="font-bold text-sm">{seat.code}</div>
                        </div>
                    </div>
                ) : (isUnavailable == true) ? (
                    <div

                        className={`p-1 ${unavailableColor} rounded-xl cursor-pointer flex flex-col justify-center items-center`}
                        style={{ width: '60px', margin: '0 auto' }}
                    >
                        <FaChair size={40} color='darkgray' />
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
                        top: '-120px',
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
                        <div className="text-sm"><span className='text-green-400 font-bold'>{seat.code}
                            : </span> {seatType}</div>
                        <div className="text-sm"> <span className='text-green-400 font-bold'>Cost:</span>  {seat?.freeOfCharge == false ? "Fee Aplied" : "Free of Cost"}</div>
                    </div>

                    <div className=''
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                        }}
                    >


                        <button
                            onClick={() => onSeatSelected(seat)}
                            className=" bg-green-300 text-white px-2 py-1 text-sm rounded hover:bg-green-500 transition duration-300"
                        >
                            Select Seat
                        </button>
                    </div>
                    <div
                        className="tooltip-arrow"
                        style={{
                            position: 'absolute',
                            bottom: '-10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: '10px solid white',
                        }}
                    ></div>
                </div>
            )
            }
        </div >
    );
}

export default Seat;