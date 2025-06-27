import React, { useState, useEffect } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import InventoryLayout from '@/Layouts/InventoryLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Colors from '@/Components/Colors';
import Sizes from '@/Components/Sizes';
import HeelHeights from '@/Components/HeelHeights';
import Categories from '@/Components/Categories';
import Buttons from '@/Components/UI/Buttons';


const ViewProduct = ({ colors, sizes, size_values, heel_heights, categories }) => {

    const product = usePage().props.product;
    const product_variants = usePage().props.product.variants;
    const { data, setData, post, errors } = useForm({
        product_name: product.product_name || '',
        status: product.status || '',
        cost: product.cost || 0,
        srp: product.srp || 0,
        colors: product.colors || [],
        sizes: product.sizes || [],
        heel_heights: product.heel_heights || [],
        categories: product.categories || [],
        product_variants: product.variants,
        updated_variants: [],
        new_variants: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // const payload = {
        //     product_id: product.id,
        //     variants, // Includes all the updated variants with SKUs
        // };

        console.log(data.new_variants);
        // console.log(data);

        // post('/inventory/products/variants');
    };

    const [variants, setVariants] = useState([]);

    const generateVariants = () => {
        const generatedVariants = [];

        product.colors.forEach(color => {
            product.heel_heights.forEach(heelHeight => {
                product.sizes.forEach(size => {
                    size.size_values.forEach(sizeValue => {
                        const isExisting = data.product_variants.some(variant =>
                            variant.color_id === color.id &&
                            variant.heel_height_id === heelHeight.id &&
                            variant.size_id === size.id &&
                            variant.size_value_id === sizeValue.id
                        );

                        if (!isExisting) {
                            generatedVariants.push({
                                product_id: product.id,
                                color_id: color.id,
                                heel_height_id: heelHeight.id,
                                size_id: size.id,
                                size_value_id: sizeValue.id,
                                category_id: product.categories[0].id,
                                sku: '', // Initialize SKU
                                unit_price: 0,
                                cost: 0
                            });
                        }
                    });
                });
            });
        });

        // setVariants([...variants, ...generatedVariants]);
        setData('new_variants', [...variants, ...generatedVariants])

        // console.log(size_values)
    };

    const [isEdit, setIsEdit] = useState(false);
    const [editableRows, setEditableRows] = useState({});

    const toggleRowEdit = (id) => {
        const newEditableRows = {
            ...editableRows,
            [id]: !editableRows[id],
        };

        // Check if any rows are now editable
        const isAnyEditable = Object.values(newEditableRows).some(Boolean);
        setIsEdit(isAnyEditable);

        setEditableRows(newEditableRows);
    };

    useEffect(() => {
        // console.log(product);
        // console.log(test);
        // console.log(data.product_variants);
    }, []);


        // Local batch input state
    const [batchSku, setBatchSku] = useState("");
    const [batchUnitPrice, setBatchUnitPrice] = useState("");
    const [batchCost, setBatchCost] = useState("");

    /**
     * Apply any filled‑in batch values across every variant row.
     */
    const handleApplyBatch = () => {
        if (!data.new_variants.length) return;

        const updated = data.new_variants.map(v => ({
            ...v,
            sku: batchSku != "" ? batchSku : v.sku,
            unit_price: batchUnitPrice != "" ? batchUnitPrice : v.unit_price,
            cost: batchCost != "" ? batchCost : v.cost,
        }));
        setData('new_variants', updated);
    };

    const handleRemoveVariant = (index) => {
        const updatedVariants = [...data.new_variants];
        updatedVariants.splice(index, 1); // Removes the variant at the given index
        setData('new_variants', updatedVariants);
    };

    return (
        <InventoryLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products Management
                </h2>
            }
        >
        <div className="container mx-auto p-6">
            <div className="pb-12 pt-4">
                <div className="mx-auto max-w-full sm:px-1 lg:px-2">
                    <div className="overflow-hidden bg-white shadow-md rounded-lg">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h1>

                            {/* Product Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Product Name */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">Product Name</h2>
                                    <p className="text-xl font-bold text-gray-900">{data.product_name}</p>
                                </div>

                                {/* Product Status */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">Status</h2>
                                    <p className={`text-lg font-semibold ${data.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                        {data.status}
                                    </p>
                                </div>

                                {/* Cost & SRP */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">Cost</h2>
                                    <p className="text-lg font-bold text-gray-900">₱{data.cost}</p>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">SRP</h2>
                                    <p className="text-lg font-bold text-gray-900">₱{data.srp}</p>
                                </div>
                            </div>

                            {/* Divider */}
                            <hr className="my-6 border-gray-200" />

                            {/* Product Attributes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Colors */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">Colors</h2>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {data.colors.map((color) => (
                                            <span key={color.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
                                                {color.color_name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">Sizes</h2>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {data.sizes.map((size) => (
                                            <span key={size.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
                                                {size.size_name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Heel Heights */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">Heel Heights</h2>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {data.heel_heights.map((heel) => (
                                            <span key={heel.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
                                                {heel.value}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">Category</h2>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {data.categories.map((category) => (
                                            <span key={category.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
                                                {category.category_name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <hr className="my-6 border-gray-200" />

                            {/* Variant Generation Button */}
                            <div className="flex justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={(e) => generateVariants(e)}
                                    className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                                >
                                    Generate Variants
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            {
                data.new_variants && <div className="grid grid-cols-12 gap-4 items-end bg-gray-50 p-4 rounded-xl shadow">
                    <div className="col-span-12 md:col-span-3">
                        <label className="block text-sm mb-1 font-medium text-gray-700">Batch SKU</label>
                        <input
                            type="text"
                            value={batchSku}
                            onChange={e => setBatchSku(e.target.value)}
                            placeholder="e.g. ABC‑123"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring focus:ring-purple-300 focus:outline-none"
                        />
                    </div>
                    <div className="col-span-6 md:col-span-3">
                        <label className="block text-sm mb-1 font-medium text-gray-700">Batch SRP</label>
                        <input
                            type="number"
                            value={batchUnitPrice}
                            onChange={e => setBatchUnitPrice(e.target.value)}
                            placeholder="e.g. 999.00"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring focus:ring-purple-300 focus:outline-none"
                        />
                    </div>
                    <div className="col-span-6 md:col-span-3">
                        <label className="block text-sm mb-1 font-medium text-gray-700">Batch Cost</label>
                        <input
                            type="number"
                            value={batchCost}
                            onChange={e => setBatchCost(e.target.value)}
                            placeholder="e.g. 750.00"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring focus:ring-purple-300 focus:outline-none"
                        />
                    </div>

                    <div className="col-span-12 md:col-span-3 flex md:justify-end">
                        <button
                            type="button"
                            onClick={handleApplyBatch}
                            className="w-full md:w-auto bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition"
                        >
                            Apply to All
                        </button>
                    </div>
                </div>
            }
            
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Product Variants</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 bg-gray-50 border border-gray-200 rounded-lg shadow">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-3 font-medium">Color</th>
                                <th className="px-4 py-3 font-medium">Heel Height</th>
                                <th className="px-4 py-3 font-medium">Size Value</th>
                                <th className="px-4 py-3 font-medium">SKU</th>
                                <th className="px-4 py-3 font-medium">SRP</th>
                                <th className="px-4 py-3 font-medium">COST</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.new_variants?.map((variant, index) => {
                                const colorName = colors.find(color => color.id === variant.color_id)?.color_name || 'Unknown';
                                const heelHeightName = heel_heights.find(height => height.id === variant.heel_height_id)?.value || 'Unknown';
                                const sizeValue = size_values.find(value => value.id === variant.size_value_id)?.size_values || 'Unknown';    
                                return (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-2 text-gray-900">{colorName}</td>
                                        <td className="px-4 py-2 text-gray-900">{heelHeightName}</td>
                                        <td className="px-4 py-2 text-gray-900">{sizeValue}</td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={variant.sku}
                                                onChange={(e) => {
                                                    const updatedVariants = [...data.new_variants];
                                                    updatedVariants[index].sku = e.target.value;
                                                    setData('new_variants', updatedVariants);
                                                }}
                                                placeholder="Enter SKU"
                                                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:ring focus:ring-green-300 focus:outline-none transition"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={variant.unit_price}
                                                onChange={(e) => {
                                                    const updatedVariants = [...data.new_variants];
                                                    updatedVariants[index].unit_price = e.target.value;
                                                    setData('new_variants', updatedVariants);
                                                }}
                                                placeholder="Enter Unit Price"
                                                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:ring focus:ring-green-300 focus:outline-none transition"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={variant.cost}
                                                onChange={(e) => {
                                                    const updatedVariants = [...data.new_variants];
                                                    updatedVariants[index].cost = e.target.value;
                                                    setData('new_variants', updatedVariants);
                                                }}
                                                placeholder="Enter Unit Cost"
                                                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:ring focus:ring-green-300 focus:outline-none transition"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <Buttons.IconDeleteButton
                                                type="button"
                                                onClick={() => handleRemoveVariant(index)} 
                                                title="Remove"
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {
                    data.new_variants.length > 0 && <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e)}
                            className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                        >
                            Save Variants
                        </button>
                    </div>
                }

            </div>

            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Existing Product Variants</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs text-left text-gray-500 bg-gray-50 border border-gray-200 rounded-lg shadow">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-3 font-medium">ID</th>
                                <th className="px-4 py-3 font-medium">Color</th>
                                <th className="px-4 py-3 font-medium">Heel Height</th>
                                <th className="px-4 py-3 font-medium">Size Value</th>
                                <th className="px-4 py-3 font-medium">SKU</th>
                                <th className="px-4 py-3 font-medium">SRP</th>
                                <th className="px-4 py-3 font-medium">COST</th>
                                <th className="px-4 py-3 font-medium">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {product_variants?.map((variant, index) => {
                                const colorName = colors.find(color => color.id === variant.color_id)?.color_name || 'Unknown';
                                const heelHeightName = heel_heights.find(height => height.id === variant.heel_height_id)?.value || 'Unknown';
                                const size_value = size_values.find(values => values.id === variant.size_value_id)?.size_values || 'Unknown';
                                return (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-2 text-gray-900">{variant.id}</td>
                                        <td className="px-4 py-2 text-gray-900">{colorName}</td>
                                        <td className="px-4 py-2 text-gray-900">{heelHeightName}</td>
                                        <td className="px-4 py-2 text-gray-900">{size_value}</td>
                                        <td className="px-4 py-2 text-gray-900">
                                            {
                                                editableRows[variant.id] && data.product_variants[index].stock_levels.length === 0  && data.product_variants[index].stock_levels.length === 0 ? (
                                                    <TextInput
                                                        className="text-xs p-1 hover:border-purple-500 w-fit"
                                                        value={data.product_variants[index].sku}
                                                        onChange={(e) => {
                                                            const value = e.target.value;

                                                            setData((curr) => {
                                                                /* ---------- 1. update the master list ---------- */
                                                                const product_variants = curr.product_variants.map((v) =>
                                                                    v.id === variant.id ? { ...v, sku: value } : v
                                                                );

                                                                /* ---------- 2. stash only the edited row ---------- */
                                                                const updated_variants = {
                                                                    ...(curr.updated_variants || {}),
                                                                    [variant.id]: {
                                                                    ...(curr.updated_variants?.[variant.id] || variant),
                                                                        sku: value,
                                                                    },
                                                                };

                                                                /* ---------- 3. return the new form state ---------- */
                                                                return { ...curr, product_variants, updated_variants };
                                                            });

                                                            console.log(data.updated_variants);
                                                        }}
                                                    />

                                                ) : (variant.sku)
                                            }
                                        </td>
                                        <td className="px-4 py-2 text-gray-900">
                                                                                                                {
                                            editableRows[variant.id] ? (
                                                    <TextInput
                                                        className="text-xs p-1 hover:border-purple-500 w-fit"
                                                        value={data.product_variants[index].unit_price}
                                                        size={8}
                                                        onChange={(e) => {
                                                            const value = e.target.value;

                                                            setData((curr) => {
                                                                /* ---------- 1. update the master list ---------- */
                                                                const product_variants = curr.product_variants.map((v) =>
                                                                    v.id === variant.id ? { ...v, unit_price: value } : v
                                                                );

                                                                /* ---------- 2. stash only the edited row ---------- */
                                                                const updated_variants = {
                                                                    ...(curr.updated_variants || {}),
                                                                    [variant.id]: {
                                                                    ...(curr.updated_variants?.[variant.id] || variant),
                                                                        unit_price: value,
                                                                    },
                                                                };

                                                                /* ---------- 3. return the new form state ---------- */
                                                                return { ...curr, product_variants, updated_variants };
                                                            });
                                                        }}
                                                    />

                                                ) : (variant.unit_price)
                                            }
                                        </td>
                                        <td className="px-4 py-2 text-gray-900">
                                            {
                                                editableRows[variant.id] ? (
                                                    <TextInput
                                                        className="text-xs p-1 hover:border-purple-500 w-fit"
                                                        value={data.product_variants[index].cost}
                                                        size={8}
                                                        onChange={(e) => {
                                                            const value = e.target.value;

                                                            setData((curr) => {
                                                                /* ---------- 1. update the master list ---------- */
                                                                const product_variants = curr.product_variants.map((v) =>
                                                                    v.id === variant.id ? { ...v, cost: value } : v
                                                                );

                                                                /* ---------- 2. stash only the edited row ---------- */
                                                                const updated_variants = {
                                                                    ...(curr.updated_variants || {}),
                                                                    [variant.id]: {
                                                                    ...(curr.updated_variants?.[variant.id] || variant),
                                                                        cost: value,
                                                                    },
                                                                };

                                                                /* ---------- 3. return the new form state ---------- */
                                                                return { ...curr, product_variants, updated_variants };
                                                            });
                                                        }}
                                                    />

                                                ) : (variant.cost)
                                            }
                                        </td>
                                        <td className="px-4 py-2 text-gray-900 space-x-2">

                                            <Buttons.IconUpdateButton
                                                key={index}
                                                className={`p-2 text-white rounded-full transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editableRows[variant.id] ? 'bg-blue-600' : 'bg-blue-400'}`}
                                                onClick={() => toggleRowEdit(variant.id)}
                                                title="Update"
                                            />
                                            

                                            {/* {
                                                variant.stock_levels.length > 0 || variant.stock_movements.length > 0 ? 
                                                <></> 
                                                : 
                                                <Buttons.IconUpdateButton
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    title="Update"
                                                />
                                            } */}
                                            
                                            {
                                                variant.stock_levels.length > 0 || variant.stock_movements.length > 0 || isEdit ? 
                                                <></> 
                                                : 
                                                <Buttons.IconDeleteButton
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (
                                                            confirm(
                                                                'Are you sure you want to delete this Variant?',
                                                            )
                                                        ) {
                                                            router.delete(`/inventory/products/variant-delete/${variant.id}`, {
                                                                onSuccess:  () => {
                                                                    setIsEdit(false);
                                                                    setData('updated_variants', []);
                                                                    setEditableRows({});
                                                                },
                                                                preserveScroll: true,
                                                            });
                                                        }
                                                    }}
                                                    title="Delete"
                                                />
                                            }
                                            
                                        </td>
                                        
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {
                        isEdit && <Buttons.IconSaveButton onClick={(e) => {
                            e.preventDefault();
                            if (
                                confirm(
                                    'Are you sure you want to udpate the Product Variants?',
                                )
                            ) {
                                post('/inventory/product/variant-update', {
                                    onSuccess:  () => {
                                        setIsEdit(false);
                                        setData('updated_variants', []);
                                        setEditableRows({});
                                    },
                                    preserveScroll: true,
                                });
                            }
                        }} />
                    }
                </div>
            </div>
        </div>

        </InventoryLayout>
    
    );
};

export default ViewProduct;
