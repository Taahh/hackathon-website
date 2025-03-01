import Tag from "../../Tag";
import { COLORS } from "@/data/Tags";
import Link from "next/link";
import { ICONS } from "@/data/admin/Icons";
import Loading from "@/components/Loading";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

const Table = ({ data }) => {
  const team = data?.filter((group) => !group.hidden);
  const ref = useRef(null);
  const { measureElement, getVirtualItems } = useVirtualizer({
    count: team?.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 30,
    measureElement: (el) => {
      if (el.clientHeight > 300) return 80;
      else if (el.clientHeight > 200) return 60;
      else return 30;
    },
  });
  return team === null ? (
    <Loading />
  ) : (
    <div ref={ref} className="overflow-y-scroll h-full">
      {getVirtualItems().map((virtualItem, index) => {
        if (virtualItem.index % 4) return null;
        const row = team.slice(virtualItem.index, virtualItem.index + 4);
        return (
          <div
            key={`row: ${Math.floor(virtualItem.index / 4)}`}
            className="grid grid-cols-4"
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {row.map((group, index) => (
              <div
                key={`column: ${index}`}
                className="flex items-start p-2"
                ref={measureElement}
                data-index={virtualItem.index + index}
              >
                <div className="bg-white w-full p-3 rounded-xl">
                  <div className="flex justify-between items-center">
                    <Tag color={COLORS["grayblue"]} text={group.name} />
                    <div className="flex justify-start w-full ml-2">
                      {group.links &&
                        group.links
                          .filter((l) => l.link.length)
                          .map((link, index) => (
                            <Link
                              key={index}
                              href={link.link}
                              target="_blank"
                              className="m-0 p-0 text-black no-underline hover:!text-hackathon-blue-100 text-xl"
                            >
                              {ICONS[link.name]}
                            </Link>
                          ))}
                    </div>
                    {group.table && (
                      <p className="mb-0 text-hackathon-green-300 font-semibold whitespace-nowrap">
                        table {group.table}
                      </p>
                    )}
                  </div>
                  {group.rounds.map((judges, index) => (
                    <div key={index} className="flex items-center my-2">
                      <p className="font-semibold mb-0 mr-2">{index + 1}</p>
                      <div className="flex items-center">
                        {judges.map(({ name, affiliation }, i) => (
                          <Tag
                            classes="mx-1"
                            color={COLORS[affiliation]}
                            key={i}
                            text={name}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
