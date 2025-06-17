import React, { useState } from 'react';
import { Link, usePage, router } from "@inertiajs/react";
import SettingsLayout from "@/Layouts/SettingsLayout";
import { LinkIconCreate } from '@/Components/UI/Links';

const CategoriesIndex = ({ categories }) => {

    return (
        <SettingsLayout
            header={

                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Product Categories
                    </h2>
                    <LinkIconCreate
                        href="/settings_categories/create"
                        name={"Categories"}
                    />
                </div>
            }
        >
            <div className="p-6 bg-white border-b border-gray-200">
                <div className="flex justify-between mb-4">
                    <h1 className="text-lg font-semibold">Categories List</h1>
                    {/* <Link
                        href="/settings_categories/create"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create New Categories
                    </Link> */}
                </div>

                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">#</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Label</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((categories, index) => (
                            <tr key={categories.id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {categories.category_name}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {categories.category_label}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link
                                        href={`/settings_categories/${categories.id}/edit`}
                                        className="text-blue-500 hover:underline mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/settings_categories/${categories.id}`}
                                        method="delete"
                                        className="text-red-500 hover:underline"
                                        as="button"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent default link behavior
                                            if (confirm("Are you sure you want to remove this categories?")) {
                                                // Perform the deletion
                                                router.delete(`/settings_categories/${categories.id}`);
                                            }
                                        }}
                                    >
                                        Delete
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SettingsLayout>
    );
};

export default CategoriesIndex;
