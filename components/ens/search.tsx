import { ChangeEvent, useEffect, useState } from "react";
import { useProvider } from "wagmi";

const parseTextArea = (text: string) => {
  const lines = text.split("\n");
  const noWhitespaceLines = lines.map((line) => line.replace(/\s/g, ""));
  const dotEthAppended = noWhitespaceLines.map((line) =>
    line.length >= 3 ? `${line}.eth` : "",
  );
  return dotEthAppended;
};

export default function Search() {
  const provider = useProvider();
  const [textArea, setTextArea] = useState<string>("vitalik");
  const [queriedNames, setQueriedNames] = useState<{ [name: string]: string }>(
    {},
  );
  const queryNames = parseTextArea(textArea);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        if (isTyping) {
          setIsTyping(false);
          if (!provider) return console.error("Could not get provider!");
          resolveNames(queryNames);
        }
      }, 500);
      console.log({ timer });
    }
  }, [isTyping]);

  const isValidName = (name: string) => name.length >= 3;

  const resolveNames = async (names: string[]) => {
    const namesToFetch = names
      .filter((name) => !(name in queriedNames))
      .filter(isValidName);
    console.log(`Fetching ${namesToFetch.length} names!`);
    return await Promise.all(
      namesToFetch.map((name) =>
        provider.resolveName(name).then((result) => {
          setQueriedNames((prev) => {
            const status = isValidName(name)
              ? result
                ? "Unavailable"
                : "Available"
              : "Invalid";
            const obj = { ...prev, [name]: status };
            return obj;
          });
        }),
      ),
    );
  };

  const onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(event.target.value);
    if (!isTyping) {
      setIsTyping(true);
    }
  };

  return (
    <div className="relative w-full rounded-xl border border-gray-200 bg-white p-8 shadow-md">
      <div className="grid grid-cols-7">
        <textarea
          className="col-span-4 whitespace-nowrap rounded-xl border-gray-300 focus:ring-0 focus:ring-offset-0"
          rows={10}
          cols={40}
          value={textArea}
          onChange={onTextAreaChange}
        ></textarea>
        <div className="col-span-1 ml-2 pt-2">
          {queryNames.map((name, idx) => (
            <p key={idx}>{name}</p>
          ))}
        </div>
        <div className="col-span-1 ml-2 pt-2">
          {queryNames.map((name, idx) => {
            const ensLink = `https://app.ens.domains/name/${name}/details`;
            return (
              <p
                key={idx}
                className={`font-semi-bold ${
                  queriedNames[name] === "Available"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {queriedNames[name]}
              </p>
            );
          })}
        </div>
        <div className="col-span-1 ml-2 pt-2">
          {queryNames.map((name, idx) => {
            const ensLink = `https://app.ens.domains/name/${name}/details`;
            return (
              <p key={idx}>
                <a
                  className={`text-blue-600`}
                  href={ensLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {queriedNames[name] &&
                    queriedNames[name] !== "Invalid" &&
                    "link"}
                </a>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
