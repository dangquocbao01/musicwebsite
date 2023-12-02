import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SectionItem from "./SectionItem";
import path from "../ultis/path";

const Section = ({ data, number, HideBtn }) => {
  const { currentWidth } = useSelector((state) => state.app);

  return (
    <div className="mt-4 md:mt-12 px-[10px] md:px-[60px] flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold pl-[16px]">{data?.title}</h3>
        {!HideBtn && (
          <Link
            to={path.HUB}
            className="text-xs uppercase hover:text-main-500  "
          >
            Tất cả
          </Link>
        )}
      </div>

      <div className="flex flex-wrap justify-start">
        {data &&
          data?.items?.length > 0 &&
          data?.items
            .filter((item, index) => index <= number)
            ?.map((item) => (
              <SectionItem
                data={data}
                link={item.link}
                thumbnailM={item.thumbnailM}
                sortDescription={item.sortDescription}
                title={item.title}
                key={item.encodeId}
              />
            ))}
      </div>
    </div>
  );
};

export default memo(Section);
