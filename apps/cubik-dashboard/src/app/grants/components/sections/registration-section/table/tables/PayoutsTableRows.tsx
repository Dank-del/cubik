import { AvatarGroup, AvatarLabelGroup, TableCell, TableRow } from "@cubik/ui";
import Tag from "@cubik/ui/components/ui/tag";
import React from "react";

export const PayoutsTableRows = () => {
  return (
    <>
      <TableRow className="hover:bg-surface-neutral-820">
        <TableCell className="font-medium">
          <AvatarLabelGroup
            avatarSrc="/projectLogo.jpeg"
            title="Superteam"
            variant={1}
            subtitle="by @kash"
            size="md"
            shape="square"
          />
        </TableCell>

        <TableCell>29%</TableCell>
        <TableCell className="">
          <p className="flex tracking-widest">$12,596.6</p>
        </TableCell>
        <TableCell>
          <Tag
            text="Executed"
            iconName="doubleTick"
            color="#000"
            className="bg-green-500 text-black"
          />
        </TableCell>
      </TableRow>

      <TableRow className="hover:bg-surface-neutral-820">
        <TableCell className="font-medium">
          <AvatarLabelGroup
            avatarSrc="/projectLogo.jpeg"
            title="Superteam"
            variant={1}
            subtitle="by @kash"
            size="md"
            shape="square"
          />
        </TableCell>

        <TableCell>29%</TableCell>
        <TableCell className="">
          <p className="flex tracking-widest">$12,596.6</p>
        </TableCell>
        <TableCell>
          <Tag
            text="Not Executed"
            iconName="spinner"
            color="#000"
            className="bg-[#F5D431] text-black"
          />
        </TableCell>
      </TableRow>

      <TableRow className="hover:bg-surface-neutral-820">
        <TableCell className="font-medium">
          <AvatarLabelGroup
            avatarSrc="/projectLogo.jpeg"
            title="Superteam"
            variant={1}
            subtitle="by @kash"
            size="md"
            shape="square"
          />
        </TableCell>

        <TableCell>29%</TableCell>
        <TableCell className="">
          <p className="flex tracking-widest">$12,596.6</p>
        </TableCell>
        <TableCell>
          <Tag
            text="Not Signed"
            iconName="clock"
            color="#fff"
            className="bg-blue-500 text-white"
          />
        </TableCell>
      </TableRow>
    </>
  );
};
