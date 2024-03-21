import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';

const Tabs = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e: React.MouseEvent, newActiveTab: string) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className={clsx('mx-auto w-full', className)}>
      <div className="border-b-2 border-black w-full">
        <div className="flex max-w-3xl mx-auto">
          {children.map((child: any) => (
            <button
              key={child.props.label}
              className={`${
                activeTab === child.props.label
                  ? 'bg-black rounded-t-lg !text-[#FDEDC8] '
                  : ''
              } flex-1 text-gray-700 font-bold text-2xl py-2 `}
              onClick={(e: React.MouseEvent) =>
                handleClick(e, child.props.label)
              }
            >
              {child.props.label}
            </button>
          ))}
        </div>
      </div>
      <div className="py-4 ">
        {children.map((child: any) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div aria-label={label} className="hidden">
      {children}
    </div>
  );
};
export { Tabs, Tab };
