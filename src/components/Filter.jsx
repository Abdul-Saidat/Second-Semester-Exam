import React from "react";

function Filter({ completionStatus, setCompletionStatus }) {
  return (
    <>
      <div className="flex items-center justify-around">
        <button
          className={`btn btn-secondary ${completionStatus === "all" ? "bg-amber-700" : ""}`}
          onClick={() => setCompletionStatus("all")}
        >
          All
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setCompletionStatus("completed")}
        >
          Completed
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setCompletionStatus("uncompleted")}
        >
          Uncompleted
        </button>
      </div>
    </>
  );
}

export default Filter;
