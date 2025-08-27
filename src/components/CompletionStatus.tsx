type StatusType = "all" | "completed" | "uncompleted";

interface StatusProps {
  completionStatus: StatusType;
}

function Status({ completionStatus }: StatusProps) {
  const completion = completionStatus ? "completed" : "uncompleted";

  return (
    <>
      <p>
        {" "}
        <span className="font-bold"> Completion status: </span>{" "}
        {completion}{" "}
      </p>
    </>
  );
}

export default Status;
