import { ContentContainer } from '@/components'
import { Line, Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LineElement, LinearScale, PointElement, ChartData, Point } from 'chart.js/auto'
import { DatePicker, Typography } from 'antd'
import { getWeeksInMonth } from '@/helpers'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { getTotalPriceInWeeks, ticketResults } from '@/store/slices/chartSlice'
import { RootState } from '@/store'
import dayjs from 'dayjs'

import { getAllTicketPackage } from '@/store/slices/ticketSlice'

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement)
const Dashboard = () => {
    const dispatch = useAppDispatch()
    const { listTicketPackage } = useAppSelector((state: RootState) => state.ticket)
    const { eventPackage, familyPackage } = useAppSelector((state: RootState) => state.chart)

    const [totalPriceVND, setTotalPriceVND] = useState('')
    const { listPrice } = useAppSelector((state: RootState) => state.chart)
    const data: ChartData<'line', (number | Point | null)[], unknown> = {
        labels: getWeeksInMonth(),
        datasets: [
            {
                data: listPrice,
                fill: true,
                borderWidth: 4,
                tension: 0.4,
                pointRadius: 0,
                borderColor: '#FF993C',
                backgroundColor: (context) => {
                    const chart = context.chart
                    const { ctx, chartArea } = chart

                    if (!context.chart.chartArea) {
                        return
                    }

                    const gradientBg = ctx.createLinearGradient(0, 0, 0, chartArea.height)
                    gradientBg.addColorStop(0, 'rgba(250, 160, 95, 0.26)')
                    gradientBg.addColorStop(141.68 / chartArea.height, 'rgba(255, 255, 255, 0)')

                    return gradientBg
                },
            },
        ],
    }

    const dataDoughnutEvent: ChartData<'doughnut', (number | Point | null)[], unknown> = {
        labels: [eventPackage.notUsedYet, eventPackage.used],
        datasets: [
            {
                data: [eventPackage.notUsedYet, eventPackage.used],
                backgroundColor: ['#f88646', '#4f75ff'],
                borderWidth: 0,
            },
        ],
    }

    const dataDoughnutFamily: ChartData<'doughnut', (number | Point | null)[], unknown> = {
        labels: [familyPackage.notUsedYet, familyPackage.used],
        datasets: [
            {
                data: [familyPackage.notUsedYet, familyPackage.used],
                backgroundColor: ['#f88646', '#4f75ff'],
                borderWidth: 0,
            },
        ],
    }

    useEffect(() => {
        dispatch(getAllTicketPackage())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTotalPriceInWeeks())
    }, [dispatch])

    useEffect(() => {
        dispatch(ticketResults())
    }, [dispatch])

    useEffect(() => {
        const currentDate = dayjs()
        const startOfWeek = currentDate.startOf('week').day()
        const endOfWeek = currentDate.endOf('week').day()

        const filterDate = listTicketPackage.filter((i) => {
            const day = dayjs(i.effectiveDate.date, 'DD/MM').day()
            return day >= startOfWeek && day <= endOfWeek
        })

        const totalMoney = filterDate.reduce((acc, curr) => {
            acc += curr.comboTicket === '' ? Number(curr.singleTicket) : Number(curr.comboTicket)

            return acc
        }, 0)

        setTotalPriceVND((totalMoney * 1000).toLocaleString('vi-VN'))
    }, [listTicketPackage])

    return (
        <ContentContainer title="Thống kê">
            <div className="relative mb-10 h-[200px]">
                <div className="flex items-center justify-between">
                    <Typography.Title level={5}>Doanh thu</Typography.Title>
                    <DatePicker
                        picker="month"
                        format={'[Tháng] M, YYYY'}
                        inputRender={(props) => <input className="w-[97px] mr-[10px] font-medium text-sm leading-[22px] font-montserrat" {...props} />}
                        className="border border-[#E5E0E0] py-2 px-3 rounded-[4px]"
                    />
                </div>
                <Line
                    className="w-full pr-[31px] h-full"
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
                <p className="text-sm leading-[22px] font-medium font-montserrat">Tổng doanh thu theo tuần</p>
                <span className="text-sm leading-[22px] font-medium font-montserrat flex items-end gap-1">
                    <span className="font-bold leading-[30px] text-2xl font-montserrat">{totalPriceVND}</span>
                    đồng
                </span>
            </div>

            <div className="relative flex items-start">
                <DatePicker className="mr-[100px]" />

                <div className="flex items-center flex-col mr-[148px]">
                    <h4 className="font-montserrat leading-7 font-semibold text-lg mb-3">Gói gia đình</h4>
                    <div className="relative">
                        <Doughnut
                            className="w-[246px] h-[246px] object-cover"
                            data={dataDoughnutFamily}
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
                    </div>
                </div>
                <div className="flex items-center flex-col mr-[148px]">
                    <h4 className="font-montserrat leading-7 font-semibold text-lg mb-3">Gói sự kiện</h4>
                    <Doughnut
                        className="w-[246px] h-[246px] object-cover"
                        data={dataDoughnutEvent}
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

                <div className="flex item-state justify-center flex-col gap-[17px] mt-[53px]">
                    <div className="flex items-center gap-2 leading-[22px] text-sm font-normal font-montserrat">
                        <div className="w-[44px] h-5 bg-[#4f75ff] rounded-[4px]"></div>
                        Vé đã sử dụng
                    </div>
                    <div className="flex items-center gap-2 leading-[22px] text-sm font-normal font-montserrat">
                        <div className="w-[44px] h-5 bg-[#f88646] rounded-[4px]"></div>
                        Vé chưa sử dụng
                    </div>
                </div>
            </div>
        </ContentContainer>
    )
}

export default Dashboard
