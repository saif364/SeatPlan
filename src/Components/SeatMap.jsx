
import { useState, useEffect } from 'react';
import data from '../assets/SeatMapResponse.json';
import Seat from './Seat';
import React from 'react';
import { FaChair } from 'react-icons/fa';

function SeatMap() {

    const [seatMap, setSeatMap] = useState(null);
    const [seatRows, setseatRows] = useState(null);


    useEffect(() => {
        try {

            const seatMapData = data.seatsItineraryParts[0]?.segmentSeatMaps[0]?.passengerSeatMaps[0]?.seatMap;
            setSeatMap(seatMapData);
            setseatRows(seatMapData?.cabins[0]?.seatRows);
        } catch (error) {
            console.error('Error fetching seats:', error);
        }
    }, []);




    return (
        <>
            <div>
                {seatMap ? (
                    <div className="text-center">
                        <p className='text-3xl font-bold'>Aircraft: {seatMap.aircraft}</p>
                        <p className='text-2xl font-bold'>Flight Number: {seatMap.flightNumber}</p>
                        <p className='text-2xl font-bold'>Departure: {seatMap.departure}</p>
                    </div>
                ) : (
                    <p>Loading seat map...</p>
                )}

                <br></br>
            </div>
            <div className="grid grid-cols-4  ">
                <div className="col-span-1">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className='text-3xl font-bold'>Legend</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                        <div className="flex items-center justify-start mb-2">
                            <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                            &nbsp; &nbsp; Available &nbsp;
                            <div
                                className={`p-1  bg-blue-200 rounded-xl cursor-pointer flex justify-center items-center`}
                                style={{ width: '60px', margin: '0 auto' }}

                            >
                                <FaChair size={40} color='black' />
                            </div>

                        </div>
                        <div className="  flex items-center justify-start mb-2">
                            <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                            UnAvailable &nbsp;
                            <div
                                className={`p-1  bg-gray-200 rounded-xl cursor-pointer flex justify-center items-center`}
                                style={{ width: '60px', margin: '0 auto' }}

                            >
                                <FaChair size={40} color='darkgray' />
                            </div>


                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                            &nbsp;&nbsp;&nbsp; &nbsp; Selected &nbsp;
                            <div
                                className={`p-1  bg-green-200 rounded-xl cursor-pointer flex justify-center items-center`}
                                style={{ width: '60px', margin: '0 auto' }}

                            >
                                <FaChair size={40} color='black' />
                            </div>

                        </div>

                    </div>
                </div>
                <div className=" col-span-2">
                    <p className='text-center text-green-500 font-bold'>Choose your seat and enjoy the journy</p>
                    <div className="grid grid-cols-9 gap-2 ">

                        {seatRows && seatRows.map((row, index) => (
                            row.seats.map((seat, seatIndex) => (

                                seat.available ? (
                                    <Seat
                                        key={`${index}-${seatIndex}`}
                                        seat={seat}

                                    />
                                ) : (<p></p>)
                            ))
                        ))}
                    </div>
                </div>
                <div className="col-span-1"></div>

            </div>


        </>
    )
}

export default SeatMap;