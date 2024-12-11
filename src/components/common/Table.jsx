const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto border border-neutral-100 rounded-lg">
      <table className="min-w-full divide-y divide-neutral-100">
        <thead className="bg-neutral-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-neutral-50">
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 text-sm text-neutral-900">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table 