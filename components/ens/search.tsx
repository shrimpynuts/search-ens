import { ReactNode, useState } from "react";
import { useProvider } from "wagmi";

export default function Search({ query }: { query?: ReactNode }) {
  const provider = useProvider();
  const [resolvedNames, setResolvedNames] = useState<(string | null)[]>([]);
  const [queryNames, setQueryNames] = useState([
    "vitalik.eth",
    "jonathancai.eth",
    "sdfeeee.eth",
  ]);

  const resolveNames = async (names: string[]) => {
    return await Promise.all(names.map((name) => provider.resolveName(name)));
  };

  const fetchNames = () => {
    if (!provider) return console.error("Could not get provider!");
    resolveNames(queryNames).then(setResolvedNames);
  };

  return (
    <div className="relative h-96 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
      <button onClick={fetchNames}>Fetch Names</button>
      {queryNames.map((query, idx) => (
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            {idx}: {query}
          </div>
          <div className="col-span-1">
            {resolvedNames[idx] !== null ? resolvedNames[idx]?.slice(0, 8) : ""}
          </div>
        </div>
      ))}
    </div>
  );
}
