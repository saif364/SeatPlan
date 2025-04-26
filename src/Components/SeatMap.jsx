
import { useState, useEffect } from 'react';
import data from '../assets/SeatMapResponse.json';
import Seat from './Seat';
import React from 'react';
import { FaChair } from 'react-icons/fa';
import { useGlobalStyles } from '../contexts/GlobalStylesContext';

function SeatMap() {
    const { globalStyles } = useGlobalStyles();
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
            <div className='p-2 grid gap-2 bg-gray-50   mt-2 mx-auto'>


                <div className={`p-2 bg-gray-100 ${globalStyles.shadowrounded} `}>
                    {seatMap ? (
                        <div className="text-center">
                            <p className='text-2xl font-bold'>Boeing {seatMap.aircraft}</p>
                            <p className='text-1xl font-bold'>{seatMap?.cabins[0].deck} Deck </p>

                            <p className='text-center text-green-500 font-bold'>Choose your seat and enjoy the journy</p>
                        </div>
                    ) : (
                        <p>Loading seat map...</p>
                    )}
                </div>




                <div className={`grid  grid-cols-4  rounded-lg shadow-lg ${globalStyles.shadowrounded}  `}>
                    <div className={`col-span-1 bg-gray-100  pt-2 ${globalStyles.shadowrounded} `}>


                        <div className='m-2 p-2 box-border  bg-gray-100 rounded-lg shadow-md ">'>
                            <div >
                                <p className='text-2xl font-bold'> Passenger</p>
                                <p>Name :Mohmmad Khalid Saifullah</p>
                            </div>

                        </div>
                        <div className='m-2 p-2 box-border  bg-gray-100 rounded-lg shadow-md '>
                            <div className="">
                                <h1 className='text-3xl  font-bold'>Legend</h1>
                            </div>
                            <div className="">
                                <div className="flex items-center justify-start mb-2">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Available &nbsp;  &nbsp;
                                    <div
                                        className={`p-1  bg-blue-200 rounded-xl cursor-pointer flex justify-center items-center`}
                                        style={{ width: '60px', margin: '0 auto' }}

                                    >
                                        <FaChair size={40} color='black' />
                                    </div>

                                </div>
                                <div className="  flex items-center justify-start mb-2">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    UnAvailable
                                    <div
                                        className={`p-1  bg-gray-300 rounded-xl cursor-pointer flex justify-center items-center`}
                                        style={{ width: '60px', margin: '0 auto' }}

                                    >
                                        <FaChair size={40} color='darkgray' />
                                    </div>


                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Selected &nbsp;  &nbsp; &nbsp;
                                    <div
                                        className={`p-1  bg-green-200 rounded-xl cursor-pointer flex justify-center items-center`}
                                        style={{ width: '60px', margin: '0 auto' }}

                                    >
                                        <FaChair size={40} color='black' />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={`col-span-2 bg-gray-100 ${globalStyles.shadowrounded}  `} >

                        <div className={`p-2 bg-gray-100 ${globalStyles.shadowrounded} `}>
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

                    </div>
                    <div className={`col-span-1 bg-gray-100 ${globalStyles.shadowrounded} `}>
                        <div className='m-2 p-2 box-border  bg-gray-100 rounded-lg shadow-md m-4">'>
                            <div >
                                <p className='text-2xl font-bold'> Passenger</p>
                                <p>Name :Mohmmad Khalid Saifullah</p>
                            </div>

                        </div>
                    </div>

                </div>

            </div >
        </>
    )
}

export default SeatMap;