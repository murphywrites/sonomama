"use client";

import { useState } from "react";
import Button from "./Button";
import ProgramCheckoutModal from "./ProgramCheckoutModal";
import type { ProgramId } from "@/lib/types";

interface ProgramCheckoutButtonProps {
  programId: ProgramId;
  programTitle: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "cream";
  className?: string;
}

export default function ProgramCheckoutButton({
  programId,
  programTitle,
  children,
  variant = "primary",
  className = "",
}: ProgramCheckoutButtonProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        onClick={() => setCheckoutOpen(true)}
        className={className}
      >
        {children}
      </Button>
      {checkoutOpen && (
        <ProgramCheckoutModal
          programId={programId}
          programTitle={programTitle}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </>
  );
}
