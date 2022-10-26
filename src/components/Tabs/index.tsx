import { memo, useState } from "react";
import "./index.scss";

export interface TabsProps {
  defaultActiveIndex?:number,
  data?:any[],
  onChange?:Function
}

const Tabs: React.FunctionComponent<TabsProps> = ({defaultActiveIndex = 0,data,onChange}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  return (
    <div className="m-tabs">
        <div className="tab-list">
          {data.map((item, i) => {
            return (
              <div
                className={`tab ${activeIndex === i ? "z-cur" : ""}`}
                onClick={() => {
                  setActiveIndex(i)
                  onChange && onChange({
                    ...item,
                    index:i
                  })
                }}
                key={item.key}
              >
                {item.label}
              </div>
            );
          })}
        </div>
        <div className="tab-panel">
        {data.map((item, i) => {
            return (
              activeIndex  === i
               &&
              <div className={`tab-panel-${i}`}key={item.key}>
                {item.children}
              </div>
            )
          })}
        </div>
    </div>
  );
};

export default memo(Tabs);
