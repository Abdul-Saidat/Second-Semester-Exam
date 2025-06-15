function Status({ completionStatus }) {
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
