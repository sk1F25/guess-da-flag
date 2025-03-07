export function Table({ entries = [], className = "" }) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table
              className={`min-w-full text-center text-sm font-light ${className}`}
            >
              <TableHead>
                <TableRow>
                  <TableCell isHeader>place</TableCell>
                  <TableCell isHeader>player</TableCell>
                  <TableCell isHeader>score</TableCell>
                  <TableCell isHeader>percent</TableCell>
                  <TableCell isHeader>time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.place}>
                    <TableCell className="font-medium">{entry.place}</TableCell>
                    <TableCell>{entry.player}</TableCell>
                    <TableCell>{entry.score}</TableCell>
                    <TableCell>{entry.percent}%</TableCell>
                    <TableCell>{entry.time}</TableCell>
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

function TableCell({ children, isHeader = false, className = "" }) {
  const baseClasses = "whitespace-nowrap px-6 py-4";

  if (isHeader) {
    return (
      <th scope="col" className={`${baseClasses} ${className}`}>
        {children}
      </th>
    );
  }

  return <td className={`${baseClasses} ${className}`}>{children}</td>;
}

function TableHead({ children, className = "" }) {
  return (
    <thead
      className={`border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900 ${className}`}
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
