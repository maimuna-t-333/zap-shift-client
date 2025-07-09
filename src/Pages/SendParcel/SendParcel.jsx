import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { districts } from "../../../src/data/districts.js";
import { serviceCenters } from "../../../src/data/serviceCenters.js";

const SendParcel = () => {
    const [confirmedData, setConfirmedData] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const watchSenderRegion = watch("senderRegion");
    const senderCenters = serviceCenters[watchSenderRegion] || [];

    const watchReceiverRegion = watch("receiverRegion");
    const receiverCenters = serviceCenters[watchReceiverRegion] || [];

    const watchType = watch("type");

    const onSubmit = (data) => {
        // Calculate cost
        let baseCost = data.type === "document" ? 50 : 80;
        if (data.type === "non-document" && data.weight) {
            baseCost += parseInt(data.weight) * 10;
        }
        if (data.senderServiceCenter !== data.receiverServiceCenter) {
            baseCost += 30;
        }

        // Show toast with confirm button
        toast((t) => (
            <span>
                Delivery cost: <strong>{baseCost} Taka</strong>
                <br />
                <button
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => {
                        const parcelWithDate = {
                            ...data,
                            creation_date: new Date().toISOString(),
                        };
                        // Mock save
                        console.log("Saved Parcel:", parcelWithDate);
                        toast.dismiss(t.id);
                        toast.success("Parcel saved successfully!");
                        reset();
                    }}
                >
                    Confirm
                </button>
            </span>
        ));
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6  ">
            <Toaster />
            <h2 className="text-2xl font-bold text-center">Send a Parcel</h2>
            <p className="text-gray-600 text-center">
                Please provide pickup and delivery details.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 border p-10 rounded">
                {/* Parcel Info */}

                <div className="space-y-4 border p-4 rounded">
                    <h3 className="text-xl font-semibold">Parcel Info</h3>

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
                        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                    </div>
                    {watch("type") === "non-document" && (
                        <input
                            {...register("weight")}
                            type="number"
                            placeholder="Weight (optional)"
                            className="input input-bordered w-full"
                        />
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
                                defaultValue="Current User"
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
                    Submit Parcel
                </button>
            </form>
        </div>
    );
};

export default SendParcel;
