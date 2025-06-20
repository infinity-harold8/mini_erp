import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from "@inertiajs/react";
import FinanceLayout from '@/Layouts/FinanceLayout';
import { LinkIconCreate } from '@/Components/UI/Links';

const PromotionsIndex = ({ promotions }) => {

    // const [promotions, setPromotions] = useState(promotions);

    useEffect(() => {
        console.log(promotions)
        // console.log(tests);
    }, [])

    return (
        <FinanceLayout
            header={
                
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Promotions
                    </h2>
                    <LinkIconCreate
                        href="/promotions/create"
                        name={"Promotion"}
                    />
                </div>
            }
        >
        <div className="border-b border-gray-200 bg-white p-6">
            <div className="mb-4 flex justify-between">
                <h1 className="text-lg font-semibold">
                    Promotion List
                </h1>
                <Link
                    href="/promotions/create"
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                    New Promotion
                </Link>
            </div>

            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">
                            #
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Type
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Value
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Starts At
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Ends At
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {promotions?.map(({ data }, i) => (
                        <tr for={i}>
                            <td className="border border-gray-300 px-4 py-2">
                                {data.id}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {data.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {data.type}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {data.discount_value}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {data.starts_at}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {data.ends_at}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link
                                    href={route(
                                        'promotion_conditions.show',
                                        data.id,
                                    )}
                                    className="mr-2 text-yellow-500 hover:underline"
                                >
                                    Assign Items
                                </Link>
                                
                                <Link
                                    href={`/promotions/${data.id}/edit`}
                                    className="mr-2 text-blue-500 hover:underline"
                                >
                                    Edit
                                </Link>
                                {/* <Link
                                        href={`/promotions/${data.id}`}
                                        method="delete"
                                        className="text-red-500 hover:underline"
                                        as="button"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent default link behavior
                                            if (confirm("Are you sure you want to remove this Promotion?")) {
                                                // Perform the deletion
                                                router.delete(`/promotions/${data.id}`);
                                            }
                                        }}
                                    >
                                        Delete
                                    </Link> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </FinanceLayout>
    );
};

export default PromotionsIndex;
