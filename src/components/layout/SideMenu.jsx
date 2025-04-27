import React, { useEffect, useState } from 'react'
import { SIDE_MENU_USER_DATA } from './../../utils/data';
import CustomPieChart from '../Charts/CustomPieChart';
import InfoCard from '../Card/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';

const SideMenu = ({ activeMenu, dashboardAnalytics }) => {

  const [sideMenuData, setSideMenuData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

  useEffect(() => {
    setSideMenuData(SIDE_MENU_USER_DATA);
    if (dashboardAnalytics) {
      setDashboardData(() => {
        return dashboardAnalytics
      })
      prepareChartData(dashboardAnalytics.charts || null)
    }

    return () => { };
  }, [dashboardAnalytics]);


  const prepareChartData = (data) => {

    const taskDistribution = data?.taskDistribution || null;
    const taskDistributionData = [
      { status: "To Do", count: taskDistribution?.ToDo || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: 'Done', count: taskDistribution?.Done || 0 },
    ];
    setPieChartData(taskDistributionData);

  }

  return (
    <div className='w-74 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20'>
      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label
            ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3" : ""
            } py-3 px-6 mb-3 cursor-pointer`}>
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}

      <div className='mx-2 py-4'>
        <InfoCard
          label="Total Tasks"
          value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.All || 0
          )}
          color="bg-primary"
        />
        <InfoCard
          label="To Do Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.ToDo || 0
          )}
          color="bg-violet-500"
        />
        <InfoCard
          label="In Progress Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.InProgress || 0
          )}
          color="bg-cyan-500"
        />
        <InfoCard
          label="Completed Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.Done || 0
          )}
          color="bg-lime-500"
        />
      </div>

      <div className="mx-2 gap-6 my-4">
        <div>
          <div className="flex items-center justify-between">
            <h5 className="font-medium">
              Task Distribution
            </h5>
          </div>
          <CustomPieChart
            data={pieChartData}
            colors={COLORS}
          />
        </div>
      </div>
    </div >
  )
}

export default SideMenu