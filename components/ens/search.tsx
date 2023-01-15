import { ReactNode, useState } from "react";
import { useProvider } from "wagmi";

export default function Search({ query }: { query?: ReactNode }) {
  const provider = useProvider();
  const [textArea, setTextArea] = useState<string>("vitalik");
  const [queriedNames, setQueriedNames] = useState<{ [name: string]: string }>(
    {},
  );

  const parseTextArea = (text: string) => {
    const lines = text.split("\n");
    const noWhitespaceLines = lines.map((line) => line.replace(/\s/g, ""));
    const dotEthAppended = noWhitespaceLines.map((line) => `${line}.eth`);
    return dotEthAppended;
  };
  const queryNames = parseTextArea(textArea);

  const resolveNames = async (names: string[]) => {
    return await Promise.all(
      names
        .filter((name) => !(name in queriedNames))
        .map((name) =>
          provider.resolveName(name).then((result) => {
            setQueriedNames((prev) => {
              const status = result ? "Unavailable" : "Available";
              const obj = { ...prev, [name]: status };
              return obj;
            });
          }),
        ),
    );
  };

  const fetchNames = () => {
    if (!provider) return console.error("Could not get provider!");
    resolveNames(queryNames);
  };

  return (
    <div className="relative w-full rounded-xl border border-gray-200 bg-white p-8 shadow-md">
      <button onClick={fetchNames}>Fetch Names</button>
      <div className="grid grid-cols-5">
        <textarea
          className="col-span-3 whitespace-nowrap	"
          rows={8}
          cols={50}
          value={textArea}
          onChange={(event) => setTextArea(event.target.value)}
        ></textarea>
        <div className="pt-2 pl-2">
          {queryNames.map((name, idx) => (
            <p key={idx}>{name}</p>
          ))}
        </div>
        <div className="pt-2 pl-2">
          {queryNames.map((name, idx) => (
            <p key={idx}>{queriedNames[name]}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
