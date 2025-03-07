import { useEffect } from "react";
import { Table } from "../../components/table/table";
import { useLeaderboardStore } from "../../store/leaderboard-store";
import { LoadSpinner } from "../../components/ui/load-spinner";

export function Leaderboard() {
  const { entries, isLoading, fetchingLeaderboard, updateAverage } =
    useLeaderboardStore();

  useEffect(() => {
    fetchingLeaderboard();
  }, [fetchingLeaderboard]);

  useEffect(() => {
    if (!isLoading && entries.length > 0) {
      updateAverage();
    }
  }, [isLoading, entries, updateAverage]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center pt-40">
          <LoadSpinner />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-40">
          <h1 className="text-2xl font-bold mb-6 text-center">Leaderboard</h1>
          <Table entries={entries} />
        </div>
      )}
    </>
  );
}
