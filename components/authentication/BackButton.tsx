"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const BackButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <Button className="w-full" variant={"link"}>
      <Link aria-label={label} href={href}>
        {label}
      </Link>
    </Button>
  );
};

export default BackButton;
