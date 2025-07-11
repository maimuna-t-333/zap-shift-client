import React, { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  if (user?.uid) {
    axiosSecure
      .get(`/parcels?createdBy=${user.uid}`)
      .then((res) => {
        setParcels(res.data);
      })
      .catch((err) => console.error(err));
  }
}, [user, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Parcels</h2>
      {parcels.length === 0 ? (
        <p className="text-gray-600">You have not created any parcels yet.</p>
      ) : (
        <div className="space-y-4">
          {parcels.map((parcel) => (
            <div
              key={parcel._id}
              className="border rounded p-4 shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold">{parcel.title}</h3>
              <p>
                <strong>Tracking ID:</strong> {parcel.trackingId}
              </p>
              <p>
                <strong>Status:</strong> {parcel.status}
              </p>
              <p>
                <strong>Type:</strong> {parcel.type}
              </p>
              <p>
                <strong>Weight:</strong> {parcel.weight} kg
              </p>
              <p>
                <strong>From:</strong> {parcel.senderRegion} - {parcel.senderServiceCenter}
              </p>
              <p>
                <strong>To:</strong> {parcel.receiverRegion} - {parcel.receiverServiceCenter}
              </p>
              <p>
                <strong>Created On:</strong>{" "}
                {new Date(parcel.creation_date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyParcels;
