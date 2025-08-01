import React, {useState, useEffect} from 'react';
import { Link, router } from '@inertiajs/react';
import LogisticsLayout from "@/Layouts/LogisticsLayout";
import { LinkIconCreate } from '@/Components/UI/Links';

const SalesOrderList = ({ sales_orders }) => {
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [printModalData, setPrintModalData] = useState(null);

    const handleFilter = () => {
    router.visit('/logistics_orders', {
        method: 'get',
        data: { search, fromDate, toDate },
        preserveState: true,
        preserveScroll: true,
    });
    };

    useEffect(() => {
        console.log(sales_orders);
    }, [])

    const exportExcel = () => {
        // Build header row for the simple report.
        const headerRow = [
            "NO. #",
            "Sales Agent",
            "Order #",
            "Customer Soc_Med",
            "Customer Full Name",
            "Tracking #",
            "No # of Box",
            "Remarks"
        ];
    
        // Export only the currently loaded (filtered & paginated) data
        // Now mapping each transaction into an array instead of an object.
        const dataRows = sales_orders.data.map((transaction, index) => [
            index + 1,
            transaction.user.name,
            transaction.order_number,
            transaction.customers.social_media_account,
            transaction.customers.first_name +
                ' ' +
                transaction.customers.last_name,
            transaction.tracking_number,
            '',
            ''
        ]);
    
        // Combine header row and data rows.
        const worksheetData = [headerRow, ...dataRows];
    
        // Create worksheet and workbook.
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
        // Auto-fit columns.
        const colWidths = headerRow.map((header, colIndex) => {
            let maxLength = header ? header.toString().length : 10;
            worksheetData.forEach((row) => {
                const cell = row[colIndex];
                if (cell) {
                    maxLength = Math.max(maxLength, cell.toString().length);
                }
            });
            return { wch: maxLength + 2 };
        });
        worksheet["!cols"] = colWidths;
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Shipment Transactions");
        XLSX.writeFile(
            workbook,
            `Shipment_Transactions_${new Date().toISOString().split("T")[0]}.xlsx`
        );
    };
    
    return(
        <LogisticsLayout
            header={

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Sales Orders
                    </h2>
                    {/* <LinkIconCreate
                        href="/couriers/create"
                        name={"Courier"}
                    /> */}
                </div>
            }
        >
            <div className="p-6">
                <div className="container p-6 mx-auto">
                    <div className="w-full p-6 mb-2 space-y-6 bg-white shadow-md rounded-2xl">
                        <div className="flex flex-col justify-between w-full gap-4 md:flex-row md:justify-betweem md:items-center">
                            <h1 className="w-full text-3xl font-semibold">Sales Order</h1>
                            <div className="flex flex-wrap justify-end w-full gap-3">
                                {/* <Link
                                    href="/sales_payments/create"
                                    className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                                >
                                    Create Payments
                                </Link> */}
                                <button 
                                    onClick={exportExcel}
                                    className="px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                                >
                                    Export
                                </button>
                            </div>
                        </div>
                        <div className="grid items-end grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">From Date:</label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">To Date:</label>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <button
                                onClick={handleFilter}
                                className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                            >
                                Filter
                            </button>
                            
                        </div>
                        <div className="relative w-full m-0">
                            <input
                                type="text"
                                placeholder="Search for Order Number, Customer Name, or Status"
                                className="absolute w-full text-gray-400 -translate-y-1/2"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <table className="w-full border border-collapse border-gray-300 table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border border-gray-300">#</th>
                                <th className="px-4 py-2 border border-gray-300">Order #</th>
                                <th className="px-4 py-2 border border-gray-300">Client Name</th>
                                <th className="px-4 py-2 border border-gray-300">Tracking #</th>
                                <th className="px-4 py-2 border border-gray-300">Status</th>
                                <th className="px-4 py-2 border border-gray-300">Total Cost</th>
                                <th className="px-4 py-2 border border-gray-300">Payment</th>
                                <th className="px-4 py-2 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales_orders.data?.map((sales_order, index) => (
                            <tr key={sales_order.id}>
                                <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                                <td className="px-4 py-2 border border-gray-300">{sales_order.order_number}</td>
                                <td className="px-4 py-2 border border-gray-300">{sales_order.customers.first_name} {sales_order.customers.last_name}</td>
                                <td className="px-4 py-2 border border-gray-300">{sales_order.tracking_number ? sales_order.tracking_number : 'No Tracking # added yet.'}</td>
                                <td className="px-4 py-2 border border-gray-300">{sales_order.status}</td>
                                <td className="px-4 py-2 border border-gray-300">{sales_order.grand_amount}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {sales_order.payments.reduce((total, p) => total + parseFloat(p.amount_paid, 2), 0).toFixed(2)}
                                </td>
                                <td className="px-6 py-3 space-x-2 border border-gray-300">
                                    <Link
                                        href={`/logistics_orders/${sales_order.id}/edit`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/logistics_orders/${sales_order.id}`}
                                        className="text-emerald-500 hover:underline"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    {sales_orders.links && (
                        <div className="flex justify-center mt-4">
                        {sales_orders.links.map((link, index) => (
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
                            className={`mx-1 px-3 py-1 border rounded ${
                                link.active ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            ></button>
                        ))}
                        </div>
                    )}
                </div>
            </div>
        </LogisticsLayout>
    )
};

export default SalesOrderList;
