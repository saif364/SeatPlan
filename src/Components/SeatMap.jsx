
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
    const [selectedSeatCode, setSelectedSeatCode] = useState(null);
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);


    var lastCode = null;


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
    function getSeatCharacteristicsByCode(seatCode) {
        const seatRows = seatMap.cabins[0].seatRows;

        for (const row of seatRows) {
            for (const seat of row.seats) {
                if (seat.code === seatCode) {
                    return seat.rawSeatCharacteristics;
                }
            }
        }

        return null;
    }

    const getFullSetType = (type) => {

        if (type == "W") {
            return "Window Seat";
        }
        else if (type == "A") {
            return "Aisle Seat";
        }
        else if (type == "9") {
            return "Center Seat";
        }

        if (type === "CH") {
            return "Child Seat";
        }
        if (type === "RS") {
            return "Reserved Seat";
        }
        if (type === "FC") {
            return "First Class Seat";
        }
        if (type === "LS") {
            return "Luxury Seat";
        }
        if (type === "L") {
            return "Legroom Seat";
        }
        if (type === "K") {
            return "Kid-Friendly Seat";
        }
        if (type === "OW") {
            return "Overwing Seat";
        }
    }

    const handleSeatSelect = (seatCode) => {
        setSelectedSeatCode(seatCode);
        var arrcharectestics = [];
        var charectestics = getSeatCharacteristicsByCode(seatCode);
        charectestics.map((type) => {
            arrcharectestics.push(getFullSetType(type));
        });
        setSelectedCharacteristics(arrcharectestics);
    };




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
                            <div  >
                                <h1 className="ps-2 text-2xl font-bold">Legend</h1>
                            </div>
                            <div>
                                <div className="flex items-center justify-start mb-2 shadow-md p-2 rounded-2xl bg-white">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Available &nbsp; &nbsp;
                                    <div
                                        className={`p-1 bg-blue-200 rounded-xl cursor-pointer flex justify-center items-center`}
                                        style={{ width: '60px', margin: '0 auto' }}
                                    >
                                        <FaChair size={40} color="black" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-start mb-2 shadow-md p-2 rounded-2xl bg-white">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    UnAvailable
                                    <div
                                        className={`p-1 bg-gray-300 rounded-xl cursor-pointer flex justify-center items-center`}
                                        style={{ width: '60px', margin: '0 auto' }}
                                    >
                                        <FaChair size={40} color="darkgray" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-start mb-2 shadow-md p-2 rounded-2xl bg-white">
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
                                {['', 'a', 'b', 'c', '', 'd', 'e', 'f'].map((label, index) => (
                                    <div key={index} className="text-center font-bold text-blue-700">
                                        {label.toUpperCase()}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-9 gap-2">

                                {

                                    seatRows &&
                                    seatRows.map((row, index) =>
                                        row.seats.map((seat, seatIndex) => {

                                            if (seat.code) {
                                                // Extract only the numeric part from the code
                                                const numericCode = seat.code.match(/\d+/)?.[0];
                                                lastCode = numericCode || seat.code;
                                            }

                                            if ((seat.available) || (seat.storefrontSlotCode === "SEAT" && seat.available == false)) {
                                                return (
                                                    <Seat
                                                        key={`${index}-${seatIndex}`}
                                                        seat={seat}
                                                        onSelect={handleSeatSelect}
                                                        isSelected={selectedSeatCode === seat.code}
                                                        isUnavailable={true}
                                                    />
                                                );
                                            }

                                            else if (seat.storefrontSlotCode === "AISLE" && seat.storefrontSlotCode != "SEAT") {
                                                return <p key={`${index}-${seatIndex}`} className='ps-8 pt-6'>  {lastCode} </p>;
                                            } else {
                                                return <p key={`${index}-${seatIndex}`}></p>;
                                            }
                                        })
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

                        </div>
                        <div className={`m-2 p-2 box-border bg-gray-100 ${globalStyles.shadowrounded}`}>
                            <div>
                                <p className={`bg-blue-100 px-2 py-1 text-xl my-2 font-bold text-blue-700 ${globalStyles.shadowrounded}`}> Selected Seat Details</p>


                                {
                                    selectedCharacteristics.map((type) => (
                                        <div key={type} className="flex items-center justify-start mb-2 shadow-md p-2 rounded-2xl bg-green-100">
                                            <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                            {type}
                                        </div>
                                    ))
                                }


                            </div>
                            <div></div>
                        </div>
                        <div className={`m-2 p-2 box-border bg-gray-100 ${globalStyles.shadowrounded}`}>
                            <div>
                                <p className={`bg-blue-100 px-2 py-1 text-xl my-2 font-bold text-blue-700 ${globalStyles.shadowrounded}`}>  Flight Details</p>

                                <div className="flex items-center justify-start mb-2 shadow-md p-2 rounded-2xl bg-white">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Flight Number  :{' '}
                                    {segment?.flight?.flightNumber}
                                </div>

                                <div className="flex items-center justify-start mb-2 shadow-md p-2 rounded-2xl bg-white">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Departure :{' '}
                                    {segment?.departure ? new Date(segment.departure).toLocaleString() : 'No Departure Time Available'}
                                </div>

                                <div className="flex items-center justify-start mb-2 shadow-md p-2 rounded-2xl bg-white">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Arrival :{' '}
                                    {segment?.departure ? new Date(segment.arrival).toLocaleString() : 'No Departure Time Available'}
                                </div>

                                <div className="flex items-center justify-start mb-2 shadow-md p-2 rounded-2xl bg-white">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Duration :{' '}
                                    {segment?.duration} hours
                                </div>

                                <div className="flex items-center justify-start mb-2 shadow-md p-2 rounded-2xl bg-white">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Departure Terminal :{' '}
                                    {segment?.flight?.departureTerminal}
                                </div>

                                <div className="flex items-center justify-start mb-2 shadow-md p-2 rounded-2xl bg-white">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                    Arrival Terminal :{' '}
                                    {segment?.flight?.arrivalTerminal}
                                </div>

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