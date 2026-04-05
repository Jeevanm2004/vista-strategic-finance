import SummaryCards from "../components/dashboard/SummaryCards"
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart"
import SpendingBreakdownChart from "../components/dashboard/SpendingBreakdownChart"

export default function Overview() {
  return (
    <div className="space-y-6 animate-fade-in">
      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <BalanceTrendChart />
        </div>
        <div className="lg:col-span-5">
          <SpendingBreakdownChart />
        </div>
      </div>
    </div>
  )
}


