import Sidebar from "./components/Sidebar";
import Masthead from "./components/Masthead";
import SignalTicker from "./components/SignalTicker";
import Chapter from "./components/Chapter";
import Capabilities from "./components/Capabilities";
import DecisionDiary from "./components/DecisionDiary";
import IntegrationsConstellation from "./components/IntegrationsConstellation";
import ComparisonTable from "./components/ComparisonTable";
import AskTheLake from "./components/AskTheLake";
import Footnotes from "./components/Footnotes";

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Sidebar />
      <main className="lg:pl-64">
        <Masthead />
        <SignalTicker />

        <Chapter num="§ 01" title="A short essay on streams and lakes." kicker="Premise">
          <Capabilities />
        </Chapter>

        <Chapter num="§ 02" title="Every decision, kept." kicker="The diary" paper>
          <DecisionDiary />
        </Chapter>

        <Chapter num="§ 03" title="The shape of a connected lake." kicker="Constellation">
          <IntegrationsConstellation />
        </Chapter>

        <Chapter num="§ 04" title="Plans · plain reading." kicker="Pricing" paper>
          <ComparisonTable />
        </Chapter>

        <AskTheLake />
        <Footnotes />
      </main>
    </div>
  );
}
