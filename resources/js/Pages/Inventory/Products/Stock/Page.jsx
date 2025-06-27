import React, { useEffect, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import InventoryLayout from '@/Layouts/InventoryLayout';
import Links, { LinkIconCreate } from '@/Components/UI/Links';
import Buttons from '@/Components/UI/Buttons';

const ProductVariantList = ({ products, colors, sizes, size_values, heel_heights, categories }) => {
    const [search, setSearch] = useState("");
    const [color, setColors] = useState("");
    const [size, setSizes] = useState("");
    const [sizeValue, setSizeValues] = useState("");
    const [heelHeight, setHeelHeights] = useState("");
    const [category, setCategory] = useState("");
    const [qtyFilter, setQtyFilter] = useState("all");

    const handleFilter = () => {
        // Trigger a new request with the filter parameters
        router.visit('/inventory/stocks', {
            method: 'get',
            data: {
                category,
                size,
                size_value: sizeValue,
                heel_height: heelHeight,
                color,
                qty: qtyFilter,
                search,
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleExportExcel = () => {
        // Export only the currently loaded (filtered & paginated) data
        const exportData = products.data.map(product => ({
            SKU: product.sku,
            Design: product.product.product_name,
            Color: product.colors.color_name,
            Size: product.sizes.size_name,
            SizeValues: product.size_values.size_values,
            HeelHeight: product.heel_heights.value,
            Category: product.categories.category_name,
            OverallQty: parseInt(product.total_purchased - (-product.total_sold)),
        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Over all Product Stocks");
        XLSX.writeFile(workbook, `product_variants_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    useEffect(() => {
        console.log(products.data);
    }, [products]); 

    return (
        <InventoryLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Stocks
                    </h2>
                    <LinkIconCreate
                        href="/inventory/stock/transactions"
                        name={'Stock Transactions'}
                    />
                </div>
            }
        >
            <div className="p-6">
                <div className="container mx-auto p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Product Variants</h1>
                        <div className="flex gap-2">
                            <button
                                onClick={handleExportExcel}
                                className="rounded bg-green-500 px-4 py-2 text-white shadow hover:bg-green-600"
                            >
                                Export to Excel
                            </button>
                        </div>
                    </div>
                    {/* Filters */}
                    <div className="col-span-3 mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        <select
                            value={category || ''}
                            className="rounded-md border p-2 shadow-sm focus:outline-none"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.category_name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={size || ''}
                            className="rounded-md border p-2 shadow-sm focus:outline-none"
                            onChange={(e) => setSizes(e.target.value)}
                        >
                            <option value="">All Sizes</option>
                            {sizes.map((size) => (
                                <option key={size.id} value={size.id}>
                                    {size.size_name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sizeValue || ''}
                            className="rounded-md border p-2 shadow-sm focus:outline-none"
                            onChange={(e) => setSizeValues(e.target.value)}
                        >
                            <option value="">Size Values</option>
                            {size_values.map((size_value) => (
                                <option
                                    key={size_value.id}
                                    value={size_value.id}
                                >
                                    {size_value.size_values}
                                </option>
                            ))}
                        </select>

                        <select
                            value={heelHeight || ''}
                            className="rounded-md border p-2 shadow-sm focus:outline-none"
                            onChange={(e) => setHeelHeights(e.target.value)}
                        >
                            <option value="">All Heel Heights</option>
                            {heel_heights.map((height) => (
                                <option key={height.id} value={height.id}>
                                    {height.value}
                                </option>
                            ))}
                        </select>

                        <select
                            value={color || ''}
                            className="rounded-md border p-2 shadow-sm focus:outline-none"
                            onChange={(e) => setColors(e.target.value)}
                        >
                            <option value="">All Colors</option>
                            {colors.map((color) => (
                                <option key={color.id} value={color.id}>
                                    {color.color_name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={qtyFilter}
                            className="rounded-md border p-2 shadow-sm focus:outline-none"
                            onChange={(e) => setQtyFilter(e.target.value)}
                        >
                            <option value="all">All Quantities</option>
                            <option value="negative">
                                Negative Quantities
                            </option>
                            <option value="zero">Zero Quantities</option>
                            <option value="positive">
                                Positive Quantities
                            </option>
                        </select>
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search for a product..."
                            className="w-full rounded-md border p-2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            onClick={handleFilter}
                            className="rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                        >
                            Filter
                        </button>
                    </div>

                    {/* Table */}
                    <table className="mt-4 w-full table-auto border-collapse border border-gray-300 text-center text-xs">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">
                                    Product SKU
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    End
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Sold
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Purchased
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Repairs
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Return
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Replacement
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((product) => (
                                <tr key={product.id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {product.sku}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {product.current_stocks}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {product.total_sold}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {product.total_purchased}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {product.total_repair}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {product.total_return}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {product.total_replacement}
                                    </td>
                                    <td className="space-x-2 border border-gray-300 px-6 py-3">
                                        <Links.LinkIconView
                                            href={`/inventory/product/variant/${product.id}`}
                                            
                                            title="View Variant"
                                        />
                                        {/* <Link
                                            href={`/inventory/product/variant/${product.id}`}
                                            className="text-orange-500 hover:underline"
                                        >
                                            View
                                        </Link> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {products.links && (
                        <div className="mt-4 flex justify-center">
                            {products.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (link.url) {
                                            router.visit(link.url, {
                                                preserveState: true,
                                                preserveScroll: true,
                                            });
                                        }
                                    }}
                                    className={`mx-1 rounded border px-3 py-1 ${
                                        link.active
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-blue-500'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                ></button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </InventoryLayout>
    );
};

export default ProductVariantList;
