import { isAssertEntry } from "typescript";

export default function Dashboard({ headers, data }) {

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
          {data != null && data.length > 0 ? 
            (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headers.map((d, i) => {
                                return (<th className="px-6 py-3" key={i}>{d}</th>)
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => {
                            return (
                                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">{d.timestamp}</td>
                                    <td className="px-6 py-4">{d.value}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>    
            ) : (
                <span>Empty</span>
            )
          }
        </div>
      );
}