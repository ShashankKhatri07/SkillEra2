
import React, { useState } from 'react';
import { MOCK_EVENTS } from '../constants';
import { Event } from '../types';

const EventCard: React.FC<{ event: Event; onToggleRegister: (id: string) => void }> = ({ event, onToggleRegister }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col justify-between">
            <div>
                <p className="text-sm text-indigo-600 font-semibold mb-1">{event.date}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
            </div>
            <button 
                onClick={() => onToggleRegister(event.id)}
                className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                    event.registered 
                        ? 'bg-gray-200 text-gray-800 hover:bg-red-600 hover:text-white' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
            >
                {event.registered ? 'Unregister' : 'Register Now'}
            </button>
        </div>
    );
};


const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
    
    const handleToggleRegister = (id: string) => {
        setEvents(events.map(event => 
            event.id === id ? { ...event, registered: !event.registered } : event
        ));
    };

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Events & Competitions</h1>
            <p className="text-gray-600 mb-8">Get involved, learn new things, and earn points.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} onToggleRegister={handleToggleRegister} />
                ))}
            </div>
        </div>
    );
};

export default Events;