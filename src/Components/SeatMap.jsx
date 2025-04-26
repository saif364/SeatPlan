
import { useState, useEffect } from 'react';
import data from '../assets/SeatMapResponse.json';
import Seat from './Seat';
import React from 'react';
import { FaChair } from 'react-icons/fa';
import { useGlobalStyles } from '../contexts/GlobalStylesContext';
import { FaPlane } from 'react-icons/fa';
import StepNav from '../components/StepNav.jsx';

function SeatMap() {
    const { globalStyles } = useGlobalStyles();
    const [seatMap, setSeatMap] = useState(null);
    const [passenger, setPassenger] = useState(null);
    //const [seatRows, setseatRows] = useState(null);
    const [segment, setsegment] = useState(null);

    var seatRows = data.seatsItineraryParts[0]?.segmentSeatMaps[0]?.passengerSeatMaps[0]?.seatMap?.cabins[0]?.seatRows;

    useEffect(() => {
        try {

            const seatMapData = data.seatsItineraryParts[0]?.segmentSeatMaps[0]?.passengerSeatMaps[0]?.seatMap;
            setSeatMap(seatMapData);
            // setseatRows(seatMapData?.cabins[0]?.seatRows);

            const passengers = data.seatsItineraryParts[0]?.segmentSeatMaps[0]?.passengerSeatMaps[0]?.passenger;
            setPassenger(passengers);

            const segments = data.seatsItineraryParts[0]?.segmentSeatMaps[0]?.segment;
            setsegment(segments);
        } catch (error) {
            console.error('Error fetching seats:', error);
        }
    }, []);




    return (
        <>
            <div className="p-2 grid bg-gray-50 mx-auto">
                <div>
                    <StepNav />
                </div>

                <div className={`bg-blue-100 text-center my-2 ${globalStyles.shadowrounded}`}>
                    {seatMap ? (
                        <div className="text-center">
                            <p className="text-3xl font-bold text-blue-700">Boeing {seatMap.aircraft}</p>
                            <p className="text-1xl font-bold text-blue-700">{seatMap?.cabins[0].deck} Deck</p>
                            <p className="text-center text-green-500 font-bold">Choose your seat and enjoy the journey</p>
                        </div>
                    ) : (
                        <p>Loading seat map...</p>
                    )}
                </div>

                <div className={`grid grid-cols-4 rounded-lg shadow-lg ${globalStyles.shadowrounded}`}>
                    <div className={`col-span-1 bg-gray-100 ${globalStyles.shadowrounded}`}>
                        <div className={`p-2 bg-blue-100 ${globalStyles.shadowrounded} text-center m-2`}>
                            <h2 className="text-2xl font-bold text-blue-700">Passengers</h2>
                            <p className="text-lg text-blue-500">
                                {passenger?.passengerInfo?.type} : {passenger?.passengerDetails?.firstName} {passenger?.passengerDetails?.lastName}
                            </p>
                        </div>
                        <div className="m-2 p-2 box-border bg-gray-100 rounded-lg shadow-md">
                            <div>
                                <h1 className="text-2xl font-bold">Legend</h1>
                            </div>
                            <div>
                                <div className="flex items-center justify-start mb-2">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Available &nbsp; &nbsp;
                                    <div
                                        className={`p-1 bg-blue-200 rounded-xl cursor-pointer flex justify-center items-center`}
                                        style={{ width: '60px', margin: '0 auto' }}
                                    >
                                        <FaChair size={40} color="black" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-start mb-2">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    UnAvailable
                                    <div
                                        className={`p-1 bg-gray-300 rounded-xl cursor-pointer flex justify-center items-center`}
                                        style={{ width: '60px', margin: '0 auto' }}
                                    >
                                        <FaChair size={40} color="darkgray" />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Selected &nbsp; &nbsp; &nbsp;
                                    <div
                                        className={`p-1 bg-green-200 rounded-xl cursor-pointer flex justify-center items-center`}
                                        style={{ width: '60px', margin: '0 auto' }}
                                    >
                                        <FaChair size={40} color="black" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={`col-span-2 bg-gray-100 ${globalStyles.shadowrounded}`}>
                        <div className={`p-2 bg-gray-100 ${globalStyles.shadowrounded}`}>
                            <div className="grid grid-cols-9 gap-2">
                                {seatRows &&
                                    seatRows.map((row, index) =>
                                        row.seats.map((seat, seatIndex) =>
                                            seat.available ? (
                                                <Seat key={`${index}-${seatIndex}`} seat={seat} />
                                            ) : (
                                                <p key={`${index}-${seatIndex}`}></p>
                                            )
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className={`col-span-1 bg-gray-100 ${globalStyles.shadowrounded}`}>
                        <div className={`p-2 bg-blue-100 ${globalStyles.shadowrounded} m-2 flex justify-center items-center`}>
                            <h2 className="text-2xl font-bold text-blue-700 pe-4">{segment?.origin}</h2>
                            <FaPlane className="text-2xl font-bold text-blue-700" />
                            <h2 className="text-2xl font-bold text-blue-700 ps-4">{segment?.destination}</h2>
                            <h2 className="text-2xl font-bold text-blue-700 ps-4"></h2>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-green-700">Price</h3>
                                <p className="text-lg text-blue-500">
                                    {seatRows[6]?.seats[3]?.prices?.alternatives[0][0].amount +
                                        '/' +
                                        seatRows[6]?.seats[3]?.prices?.alternatives[0][0].currency}
                                </p>
                            </div>
                        </div>
                        <div className={`m-2 p-2 box-border bg-blue-100 ${globalStyles.shadowrounded}`}>
                            <div>
                                <h1 className="text-1xl font-bold">
                                    Flight Number  :{' '}
                                    {segment?.flight?.flightNumber}
                                </h1>
                                <h1 className="text-1xl font-bold">
                                    Departure :{' '}
                                    {segment?.departure ? new Date(segment.departure).toLocaleString() : 'No Departure Time Available'}
                                </h1>

                                <h1 className="text-1xl font-bold">
                                    Arrival :{' '}
                                    {segment?.departure ? new Date(segment.arrival).toLocaleString() : 'No Departure Time Available'}
                                </h1>
                                <h1 className="text-1xl font-bold">
                                    Duration :{' '}
                                    {segment?.duration} hours
                                </h1>
                                <h1 className="text-1xl font-bold">
                                    Departure Terminal :{' '}
                                    {segment?.flight?.departureTerminal}
                                </h1>
                                <h1 className="text-1xl font-bold">
                                    Arrival Terminal :{' '}
                                    {segment?.flight?.arrivalTerminal}
                                </h1>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default SeatMap;