import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { districts } from "../../../src/data/districts.js";
import { serviceCenters } from "../../../src/data/serviceCenters.js";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import axios from "axios";

const SendParcel = () => {

    
    

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const axiosSecure=useAxiosSecure();

    const watchSenderRegion = watch("senderRegion");
    const senderCenters = serviceCenters[watchSenderRegion] || [];

    const watchReceiverRegion = watch("receiverRegion");
    const receiverCenters = serviceCenters[watchReceiverRegion] || [];

    const watchType = watch("type");

    

    const formatDateTime = (isoString) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(isoString).toLocaleString("en-US", options);
    };

    

    const onSubmit = (data) => {
        const weight = parseFloat(data.weight) || 0;
        let baseCost = 0;
        let weightCost = 0;
        let zoneCost = 0;

        if (data.type === "document") {
            baseCost = 60;
            if (data.senderServiceCenter !== data.receiverServiceCenter) {
                zoneCost = 20;
            }
        } else if (data.type === "non-document") {
            if (weight <= 3) {
                baseCost = 110;
                if (data.senderServiceCenter !== data.receiverServiceCenter) {
                    zoneCost = 40;
                }
            } else {
                baseCost = 110;
                if (data.senderServiceCenter !== data.receiverServiceCenter) {
                    zoneCost = 40;
                }
                weightCost = (weight - 3) * 40;
            }
        }

        const totalCost = baseCost + weightCost + zoneCost;

        const now = new Date();
        const trackingId = "PKG" + Math.floor(Math.random() * 1000000);

        const parcelWithDate = {
            ...data,
            trackingId,
            creation_date: now.toISOString(),
            createdBy: user ? user.uid : null,
            status: "Pending",
        };

        console.log('ready for payment', parcelWithDate)

        //save data to the server

        

        axiosSecure.post('/parcels',parcelWithDate)
        // axiosSecure.get(`/parcels?createdBy=${user.uid}`)
        .then(res=>{
            console.log(res.data)
        })


        Swal.fire({
            title: "Confirm Parcel Details",
            html: `
        <div style="text-align: left;">
          <p><strong>Tracking ID:</strong> ${trackingId}</p>
          <p><strong>Created By:</strong> ${user?.displayName || user?.email || "Unknown"}</p>
          <p><strong>Created On:</strong> ${formatDateTime(now.toISOString())}</p>
          <hr>
          <p><strong>Product Name:</strong> ${data.title}</p>
          <p><strong>Parcel Type:</strong> ${data.type === "document" ? "Document" : "Non-Document"}</p>
          <p><strong>Weight:</strong> ${weight} kg</p>
          <p><strong>Sender:</strong> ${data.senderName} (${data.senderContact})</p>
          <p><strong>Receiver:</strong> ${data.receiverName} (${data.receiverContact})</p>
          <p><strong>From:</strong> ${data.senderRegion} - ${data.senderServiceCenter}</p>
          <p><strong>To:</strong> ${data.receiverRegion} - ${data.receiverServiceCenter}</p>
          <hr>
          <p><strong>Base Cost:</strong> ৳${baseCost}</p>
          ${weightCost > 0 ? `<p><strong>Extra Weight Cost:</strong> ৳${weightCost}</p>` : ""}
          ${zoneCost > 0 ? `<p><strong>Outside District Cost:</strong> ৳${zoneCost}</p>` : ""}
          <p style="font-size: 1.1em;"><strong>Total Cost:</strong> ৳${totalCost}</p>
        </div>
      `,
            icon: "info",
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Proceed",
            denyButtonText: "Edit",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Saved Parcel:", parcelWithDate);
                Swal.fire("Success!", "Parcel saved successfully.", "success");
                reset();
            } else if (result.isDenied) {
                Swal.fire("Edit your parcel information.", "", "info");
            }
        });
    };

    

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center">Send a Parcel</h2>
            {user && (
                <p className="text-gray-600 text-center">
                    Logged in as: <strong>{user.displayName || user.email}</strong>
                </p>
            )}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 border p-10 rounded"
            >
                {/* Parcel Info */}
                <div className="space-y-4 border p-4 rounded">
                    <h3 className="text-xl font-semibold">Parcel Info</h3>
                    <input
                        {...register("title", { required: "Product name is required" })}
                        placeholder="Product Name"
                        className="input input-bordered w-full"
                    />
                    {errors.title && (
                        <p className="text-red-500">{errors.title.message}</p>
                    )}

                    <div>
                        <label className="font-medium">Parcel Type:</label>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="document"
                                    {...register("type", { required: "Parcel type is required" })}
                                    className="radio radio-primary"
                                />
                                Document
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="non-document"
                                    {...register("type", { required: "Parcel type is required" })}
                                    className="radio radio-primary"
                                />
                                Non-Document
                            </label>
                        </div>
                        {errors.type && (
                            <p className="text-red-500">{errors.type.message}</p>
                        )}
                    </div>

                    <input
                        {...register("weight", { required: "Weight is required" })}
                        type="number"
                        placeholder="Weight (in kg)"
                        className="input input-bordered w-full"
                    />
                    {errors.weight && (
                        <p className="text-red-500">{errors.weight.message}</p>
                    )}
                </div>

                {/* Sender Info */}
                <div className="space-y-4 border p-4 rounded">
                    <h3 className="text-xl font-semibold">Sender Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                {...register("senderName", { required: "Sender name is required" })}
                                placeholder="Sender Name"
                                // defaultValue="Name"
                                className="input input-bordered w-full"
                            />
                            {errors.senderName && (
                                <p className="text-red-500">{errors.senderName.message}</p>
                            )}
                        </div>

                        <div>
                            <input
                                {...register("senderContact", { required: "Sender contact is required" })}
                                placeholder="Sender Contact"
                                className="input input-bordered w-full"
                            />
                            {errors.senderContact && (
                                <p className="text-red-500">{errors.senderContact.message}</p>
                            )}
                        </div>

                        {/* Region */}
                        <select
                            {...register("senderRegion", { required: "Sender region is required" })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Region</option>
                            {districts.map((district) => (
                                <option key={district.name} value={district.name}>
                                    {district.name}
                                </option>
                            ))}
                        </select>

                        {/* Service Center */}
                        <select
                            {...register("senderServiceCenter", {
                                required: "Sender service center is required",
                            })}
                            className="select select-bordered w-full"
                            disabled={!watchSenderRegion}
                        >
                            <option value="">Select Service Center</option>
                            {senderCenters.map((center) => (
                                <option key={center} value={center}>
                                    {center}
                                </option>
                            ))}
                        </select>



                        <div className="md:col-span-2">
                            <input
                                {...register("senderAddress", { required: "Sender address is required" })}
                                placeholder="Sender Address"
                                className="input input-bordered w-full"
                            />
                            {errors.senderAddress && (
                                <p className="text-red-500">{errors.senderAddress.message}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">

                            <textarea
                                {...register("pickupInstruction", { required: "Pickup instruction is required" })}
                                placeholder="Pickup Instruction"
                                className="textarea textarea-bordered w-full"
                            />
                        </div>
                    </div>
                </div>



                {/* Receiver Info */}
                <div className="space-y-4 border p-4 rounded">
                    <h3 className="text-xl font-semibold">Receiver Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                {...register("receiverName", { required: "Receiver name is required" })}
                                placeholder="Receiver Name"
                                className="input input-bordered w-full"
                            />
                            {errors.receiverName && (
                                <p className="text-red-500">{errors.receiverName.message}</p>
                            )}
                        </div>

                        <div>
                            <input
                                {...register("receiverContact", { required: "Receiver contact is required" })}
                                placeholder="Receiver Contact"
                                className="input input-bordered w-full"
                            />
                            {errors.receiverContact && (
                                <p className="text-red-500">{errors.receiverContact.message}</p>
                            )}
                        </div>

                        {/* Region */}
                        <select
                            {...register("receiverRegion", { required: "Receiver region is required" })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Region</option>
                            {districts.map((district) => (
                                <option key={district.name} value={district.name}>
                                    {district.name}
                                </option>
                            ))}
                        </select>

                        {/* Service Center */}
                        <select
                            {...register("receiverServiceCenter", {
                                required: "Receiver service center is required",
                            })}
                            className="select select-bordered w-full"
                            disabled={!watchReceiverRegion}
                        >
                            <option value="">Select Service Center</option>
                            {receiverCenters.map((center) => (
                                <option key={center} value={center}>
                                    {center}
                                </option>
                            ))}
                        </select>


                        <div className="md:col-span-2">
                            <input
                                {...register("receiverAddress", {
                                    required: "Receiver address is required",
                                })}
                                placeholder="Receiver Address"
                                className="input input-bordered w-full"
                            />
                            {errors.receiverAddress && (
                                <p className="text-red-500">{errors.receiverAddress.message}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <textarea
                                {...register("deliveryInstruction", { required: "Delivery instruction is required" })}
                                placeholder="Delivery Instruction"
                                className="textarea textarea-bordered w-full"
                            />
                        </div>
                    </div>
                </div>


                <button className="btn btn-primary text-black" type="submit">
                    Add Parcel
                </button>
            </form>
        </div>
    );
};

export default SendParcel;




