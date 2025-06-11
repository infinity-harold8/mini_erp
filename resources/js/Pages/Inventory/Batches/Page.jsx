import React, { useEffect } from 'react';
import { Link, router } from "@inertiajs/react";
import InventoryLayout from '@/Layouts/InventoryLayout';
import Controller from '@/Components/UI/Pagination/Controller';
import { PlusIcon, PencilIcon, Trash2Icon, CheckIcon } from 'lucide-react';
import Table from '@/Components/UI/Tables';
import Buttons from '@/Components/UI/Buttons';
import Links from '@/Components/UI/Links';

export default function Batches({ batches }) {
  useEffect(() => {
    console.log(batches);
  }, [batches]);

  return (
        <InventoryLayout
            header={
                <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Batches
                        </h2>
                        <Link
                            href={route('batches.create')}
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
                        >
                            <PlusIcon size={16} />
                            Create Batch
                        </Link>
                </div>
            }
        >
            <div className="px-4 py-6">
                {batches.data.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg bg-white shadow">
                        <Table>
                            <Table.Head>
                                <Table.Row>
                                    <Table.Th>Batch #</Table.Th>
                                    <Table.Th>Manf. Date</Table.Th>
                                    <Table.Th>Exp. Date</Table.Th>
                                    <Table.Th>Rec. Date</Table.Th>
                                    <Table.Th>Warehouse</Table.Th>
                                    <Table.Th>Actions</Table.Th>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {batches.data.map((batch) => (
                                    <Table.Row key={batch.id}>
                                        <Table.Td>{batch.batch_number}</Table.Td>
                                        <Table.Td>{batch.manufacturing_date}</Table.Td>
                                        <Table.Td>{batch.expiry_date}</Table.Td>
                                        <Table.Td>{batch.received_date}</Table.Td>
                                        <Table.Td>{batch.warehouse.name}</Table.Td>
                                        <Table.Td className="space-x-2 px-4 py-3 text-sm">
                                            {/* <Links.LinkIconAssign
                                                href={`/inventory/batches/${batch.id}/assign`}
                                                className="inline-flex items-center rounded-md bg-green-100 p-2 hover:bg-green-200"
                                                title="Assign"
                                            /> */}
                                            <Links.LinkIconEdit 
                                                href={`/inventory/batches/${batch.id}/edit`}
                                                className="inline-flex items-center rounded-md bg-yellow-100 p-2 hover:bg-yellow-200"
                                                title="Edit"
                                            />
                                            <Buttons.IconDeleteButton
                                                onClick={(e) => {
                                                    e.prevenTable.Tdefault();
                                                    if (
                                                        confirm(
                                                            'Are you sure you want to delete this batch?',
                                                        )
                                                    ) {
                                                        router.delete(
                                                            `/inventory/batches/${batch.id}`,
                                                        );
                                                    }
                                                }}
                                                title="Delete"
                                            />
                                        </Table.Td>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        <div className="p-4">
                            <Controller
                                value={batches}
                                preserveScrollBool
                                preserveStateBool
                            />
                        </div>
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-500">
                        No batches found.
                    </div>
                )}
            </div>
      </InventoryLayout>
  );
}
