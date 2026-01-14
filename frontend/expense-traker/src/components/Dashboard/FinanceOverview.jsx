import React from 'react'
import CustomPieChart from "../../components/Charts/CustomPieChart"

// Use darker navy as primary chart color to match theme
// Use the darker navy as the primary chart color to match the theme
const COLORS = ["#0B1D3A", "#4F83FF", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense}) => {
    const balaceData = [
        {name : "Total Balance", amount: totalBalance},
        {name : "Total Expenses",amount: totalExpense},
        {name : "Total Income" ,amount: totalIncome},
    ]
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>

        <CustomPieChart
        data={balaceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview
