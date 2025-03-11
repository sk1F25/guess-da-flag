export function Table({ entries = [], className = "" }) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden sm:rounded-lg">
            <table
              className={`min-w-full text-center text-sm font-light responsive-table ${className}`}
            >
              <TableHead>
                <TableRow>
                  <TableCell isHeader>place</TableCell>
                  <TableCell isHeader>player</TableCell>
                  <TableCell isHeader>score</TableCell>
                  <TableCell isHeader className="hidden sm:table-cell">
                    percent
                  </TableCell>
                  <TableCell isHeader>time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.place} className="overflow-hidden">
                    <TableCell dataHeader="place" className="font-medium">
                      {entry.place}
                    </TableCell>
                    <TableCell dataHeader="player">{entry.player}</TableCell>
                    <TableCell dataHeader="score">{entry.score}</TableCell>
                    <TableCell
                      dataHeader="percent"
                      className="hidden sm:table-cell"
                    >
                      {entry.percent}%
                    </TableCell>
                    <TableCell dataHeader="time">{entry.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableBody({ children, className = "" }) {
  return <tbody className={className}>{children}</tbody>;
}

function TableCell({ children, isHeader = false, className = "", dataHeader }) {
  const baseClasses = "whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4 truncate";

  if (isHeader) {
    return (
      <th scope="col" className={`${baseClasses} ${className}`}>
        {children}
      </th>
    );
  }

  return (
    <td className={`${baseClasses} ${className}`} data-header={dataHeader}>
      <div className="max-w-[120px] overflow-hidden text-ellipsis truncate">
        {children}
      </div>
    </td>
  );
}

function TableHead({ children, className = "" }) {
  return (
    <thead
      className={`border-b bg-neutral-800 font-medium 
        text-white dark:border-neutral-500 dark:bg-neutral-900 ${className}`}
    >
      {children}
    </thead>
  );
}
function TableRow({ children, className = "" }) {
  return (
    <tr className={`border-b dark:border-neutral-500 ${className}`}>
      {children}
    </tr>
  );
}
