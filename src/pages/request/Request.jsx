import DashboardStats from "@/components/base/DashboardStats";
import PageHeader from "@/components/common/PageHeader";


const stats = [
    { label: 'Total Requests', value: '70,823', change: '10%', subtext: '1,000 in last 24 hours', },
    { label: 'Total Request volume', value: '₦570,823', change: '10%', subtext: '₦100,000 in last 24 hours' },
    { label: 'Total Revenue', value: '₦500,000', change: '10%', subtext: '₦50,000 in last 24 hours' },
    { label: 'Success Rate', value: '90%', change: '10%', subtext: '%2 in last 24 hours' }
];





export default function Request () {

    return(
        <div className="min-h-screen">
            <div className="p-4">
                        <PageHeader
                            title='Requests'
                            subtitle='View all your earnings and withdraw earnings here'
                            hidden={true}
                            />

                        <DashboardStats
                        stats={stats}
                            />    
                    </div>
        </div>
       
    );
}