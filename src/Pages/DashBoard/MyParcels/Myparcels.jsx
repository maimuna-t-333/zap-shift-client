import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MyParcels = () => {

    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: Parcels = [] } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels?email=${user.email}`)
            return res.data;
        }
    })

    console.log(Parcels)

    useEffect(() => {
        axios
            .get("http://localhost:5000/parcels")
            .then((res) => {
                setParcels(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching parcels:", error);
                setLoading(false);
            });
    }, []);


    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be deleted permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:5000/parcels/${id}`, {
                    method: 'DELETE'
                });
                const data = await res.json();

                if (data.deletedCount) {
                    Swal.fire("Deleted!", "The parcel has been removed.", "success");

                    // Remove from state
                    setParcels((prev) => prev.filter((p) => p._id !== id));
                } else {
                    Swal.fire("Error!", "Parcel not found.", "error");
                }
            } catch (error) {
                console.error("Delete error:", error);
                Swal.fire("Error!", "Failed to delete parcel.", "error");
            }
        }
    };



    if (loading) {
        return <div className="text-center py-10">Loading parcels...</div>;
    }


    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">All Parcels</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>Tracking ID</th>
                            <th>Title</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Status</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr key={parcel._id}>
                                <td>{parcel.tracking_id}</td>
                                <td>{parcel.title}</td>
                                <td>{parcel.senderName}</td>
                                <td>{parcel.receiverName}</td>
                                <td>{parcel.delivery_status}</td>
                                <td>৳{parcel.cost}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => Swal.fire(JSON.stringify(parcel, null, 2))}
                                        className="btn btn-xs btn-info"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => alert(`Details for ${parcel.tracking_id}`)}
                                        className="btn text-black btn-xs btn-primary"
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No parcels found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyParcels;

