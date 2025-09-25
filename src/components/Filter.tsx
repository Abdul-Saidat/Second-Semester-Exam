type StatusType = "all" | "completed" | "uncompleted";

interface StatusProps {
  completionStatus: StatusType;
  setCompletionStatus: (value: StatusType) => void;
}
function Filter({ completionStatus, setCompletionStatus }: StatusProps) {
  return (
    <>
     <div className="flex items-center justify-evenly">
        <button
          className={`btn btn-secondary cursor-pointer px-4 py-1 border rounded-sm ${
            completionStatus === "all"
              ? "text-slate-300 bg-slate-600 hover:bg-slate-700"
              : "text-slate-300 bg-slate-600 hover:bg-slate-700"
          }`}
          onClick={() => setCompletionStatus("all")}
        >
          All
        </button>
        <button
          className="btn btn-secondary cursor-pointer px-4 py-2 border rounded-sm text-slate-300 bg-slate-600 hover:bg-slate-700"
          onClick={() => setCompletionStatus("completed")}
        >
          Completed
        </button>
        <button
          className="btn btn-secondary cursor-pointer px-4 py-2 border rounded-sm text-slate-300 bg-slate-600 hover:bg-slate-700"
          onClick={() => setCompletionStatus("uncompleted")}
        >
          Uncompleted
        </button>
      </div>
    </>
  );
}

export default Filter;
