import { Heading } from '@/components';
import { Line, Doughnut } from 'react-chartjs-2';
import {
   Chart as ChartJS,
   CategoryScale,
   LineElement,
   LinearScale,
   PointElement,
   ChartData,
   Point,
} from 'chart.js/auto';
import { DatePicker } from 'antd';

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement);
const Dashboard = () => {
   const data: ChartData<'line', (number | Point | null)[], unknown> = {
      labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
      datasets: [
         {
            data: [140, 180, 220, 260, 600, 200, 20],
            fill: true,
            borderWidth: 4,
            tension: 0.4,
            pointRadius: 0,
            borderColor: '#FF993C',
            backgroundColor: (context) => {
               const chart = context.chart;
               const { ctx, chartArea } = chart;

               if (!context.chart.chartArea) {
                  return;
               }

               const gradientBg = ctx.createLinearGradient(
                  0,
                  0,
                  0,
                  chartArea.height
               );
               gradientBg.addColorStop(0, 'rgba(250, 160, 95, 0.26)');
               gradientBg.addColorStop(
                  141.68 / chartArea.height,
                  'rgba(255, 255, 255, 0)'
               );

               return gradientBg;
            },
         },
      ],
   };

   const dataDoughnut: ChartData<
      'doughnut',
      (number | Point | null)[],
      unknown
   > = {
      labels: [13568, 56024],
      datasets: [
         {
            data: [56024, 13568],
            backgroundColor: ['#f88646', '#4f75ff'],
            borderWidth: 0,
         },
      ],
   };

   return (
      <div className="w-full bg-white rounded-3xl shadow-md overflow-hidden mb-[32px] p-6">
         <Heading title="Thống kê" />
         <div className="relative mb-10">
            <h4 className="text-lg leading-7 font-semibold font-montserrat">
               Doanh thu
            </h4>
            <Line
               className="w-full pr-[31px] h-[327px]"
               data={data}
               options={{
                  plugins: {
                     legend: {
                        display: false,
                     },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                     x: {
                        grid: {
                           display: false,
                        },
                     },
                  },
               }}
            />
         </div>

         <div className="flex flex-col items-start justify-center mb-[83px]">
            <p className="text-sm leading-[22px] font-medium font-montserrat">
               Tổng doanh thu theo tuần
            </p>
            <span className="text-sm leading-[22px] font-medium font-montserrat flex items-end gap-1">
               <span className="font-bold leading-[30px] text-2xl font-montserrat">
                  525.145.000
               </span>
               đồng
            </span>
         </div>

         <div className="relative flex items-start">
            <DatePicker className="mr-[100px]" />

            <div className="flex items-center flex-col">
               <h4 className="font-montserrat leading-7 font-semibold text-lg mb-3">
                  Gói gia đình
               </h4>
               <div className="relative">
                  <Doughnut
                     className="w-[246px] h-[246px] object-cover"
                     data={dataDoughnut}
                     options={{
                        plugins: {
                           legend: {
                              display: false,
                           },
                           tooltip: {
                              enabled: true,
                              mode: 'index',
                              intersect: true,
                           },
                        },
                     }}
                  />

                  <div className="bg-white rounded-xl p-3 shadow-md absolute transform top-2/4 -translate-y-2/4">
                     56024
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-md">13568</div>
               </div>
            </div>
            <div className="flex items-center flex-col">
               <h4 className="font-montserrat leading-7 font-semibold text-lg mb-3">
                  Gói sự kiện
               </h4>
               <Doughnut
                  className="w-[246px] h-[246px] object-cover"
                  data={dataDoughnut}
                  options={{
                     plugins: {
                        legend: {
                           display: false,
                        },
                        tooltip: {
                           cornerRadius: 12,
                           backgroundColor: '#fff',
                           titleColor: '#1e0d03',
                           padding: 12,
                           enabled: true,
                           mode: 'index',
                           intersect: true,
                        },
                     },
                  }}
               />
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
