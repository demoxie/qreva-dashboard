import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { AGENT_CATEGORIES_DATA } from './constants';

const ViewAgentCategoryDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const category = AGENT_CATEGORIES_DATA.find(c => String(c.id) === String(id)) || AGENT_CATEGORIES_DATA[0];

    const commissions = [
        { role: 'Agent', value: category.agentCommission || '0.6%' },
        { role: 'Aggregator', value: category.aggregatorCommission || '10%' },
        { role: 'Aggregator Manager', value: category.aggManagerCommission || '10%' },
        { role: 'Admin', value: category.adminCommission || '10%' },
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">View Details</h1>
                    <p className="text-[#808C91] mt-1">Kindly view the info about this category</p>
                </div>
                <Button
                    variant="outline"
                    className="border-[#FF5B04] text-[#FF5B04] hover:bg-[#FFF5F0]"
                    onClick={() => navigate(`/settings/agent-category/edit/${category.id}`)}
                >
                    Edit Category
                </Button>
            </div>

            {/* Summary Card */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                            <p className="text-xs text-[#808C91] mb-1">User Account</p>
                            <p className="font-semibold text-[#1E1E1E]">{category.userAccount || 'Agent/Merchants'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#808C91] mb-1">Category Name</p>
                            <p className="font-semibold text-[#1E1E1E]">{category.name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#808C91] mb-1">Commission Type</p>
                            <p className="font-semibold text-[#1E1E1E]">{category.commissionType || 'Percentage Commission'}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-[#808C91] mb-1">Description</p>
                        <p className="font-semibold text-[#1E1E1E]">{category.description || '-'}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Commission Breakdown */}
            <div className="mb-2">
                <h3 className="text-base font-semibold text-[#1E1E1E] mb-4">Commission Breakdown</h3>
                <Card>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {commissions.map((item) => (
                                <div key={item.role}>
                                    <p className="text-xs text-[#808C91] mb-1">{item.role}</p>
                                    <p className="text-lg font-bold text-[#1E1E1E]">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ViewAgentCategoryDetails;
