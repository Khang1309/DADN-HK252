import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useUserStore';
import { useRoomInfo } from '../store/useRoomInfo';

const RoomManager: React.FC = () => {
    const { user, logout } = useAuthStore();
    const { rooms, isLoading, error, fetchRooms, addRoom, changeRoomName } = useRoomInfo();
    const [newRoomName, setNewRoomName] = React.useState('');
    const [editingRoom, setEditingRoom] = React.useState<number | null>(null);
    const [editName, setEditName] = React.useState('');

    useEffect(() => {
        if (user) {
            fetchRooms();
        }
    }, [user, fetchRooms]);

    const handleAddRoom = async () => {
        if (newRoomName.trim()) {
            const success = await addRoom(newRoomName.trim());
            if (success) {
                setNewRoomName('');
            }
        }
    };

    const handleEditRoom = (roomId: number, currentName: string) => {
        setEditingRoom(roomId);
        setEditName(currentName);
    };

    const handleSaveEdit = async () => {
        if (editingRoom && editName.trim()) {
            const success = await changeRoomName(editingRoom, editName.trim());
            if (success) {
                setEditingRoom(null);
                setEditName('');
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingRoom(null);
        setEditName('');
    };

    if (!user) {
        return <div>Please login first</div>;
    }

    return (
        <div className="room-manager">
            <div className="header">
                <h2>Welcome, {user.name}!</h2>
                <button onClick={logout}>Logout</button>
            </div>

            <div className="add-room">
                <h3>Add New Room</h3>
                <input
                    type="text"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="Enter room name"
                />
                <button onClick={handleAddRoom}>Add Room</button>
            </div>

            <div className="rooms-list">
                <h3>Your Rooms</h3>
                {isLoading && <div>Loading rooms...</div>}
                {error && <div className="error">Error: {error}</div>}

                {rooms.map((room) => (
                    <div key={room.roomId} className="room-item">
                        {editingRoom === room.roomId ? (
                            <div className="edit-room">
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <button onClick={handleSaveEdit}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <div className="room-display">
                                <span>{room.roomName}</span>
                                <button onClick={() => handleEditRoom(room.roomId, room.roomName)}>
                                    Edit
                                </button>
                                <div className="room-stats">
                                    <span>Sensors: {room.listOfSensors.length}</span>
                                    <span>Outputs: {room.listOfOutputDevices.length}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {rooms.length === 0 && !isLoading && (
                    <div>No rooms found. Add your first room above!</div>
                )}
            </div>
        </div>
    );
};

export default RoomManager;