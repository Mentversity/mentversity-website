'use client'
import React, { useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { getDiscountedPrice } from "@/data/promocode";

interface PromoModalProps {
  open: boolean;
  onClose: () => void;
  coursePrice: number;
  onApply: (finalPrice: number, code: string | null) => void;
}

const PromocodeModal: React.FC<PromoModalProps> = ({
  open,
  onClose,
  coursePrice,
  onApply,
}) => {
  const [input, setInput] = useState("");
  const [applyError, setApplyError] = useState<string | null>(null);
  const [successApplied, setSuccessApplied] = useState<null | {
    code: string;
    final: number;
    description: string;
  }>(null);

  // Reset states every time modal is opened
  useEffect(() => {
    if (open) {
      setInput("");
      setApplyError(null);
      setSuccessApplied(null);
    }
  }, [open]);

  if (!open) return null;

  const handleApply = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setSuccessApplied(null);
      setApplyError("Promocode cannot be empty.");
      onApply(coursePrice, null);
      return;
    }
    const res = getDiscountedPrice(trimmed, coursePrice);
    if (res) {
      setSuccessApplied({
        code: res.usedCode.code,
        final: res.finalPrice,
        description: res.usedCode.description,
      });
      setApplyError(null);
      onApply(res.finalPrice, res.usedCode.code);
    } else {
      setSuccessApplied(null);
      setApplyError("Invalid or expired promocode.");
      onApply(coursePrice, null);
    }
  };

  const handleSkip = () => {
    setApplyError(null);
    setSuccessApplied(null);
    setInput("");
    onApply(coursePrice, null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-[#151A2C] rounded-xl shadow-xl w-full max-w-md p-8 relative flex flex-col">
        <button
          className="absolute top-4 right-5 text-gray-400 hover:text-[#00C896] text-2xl focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={28} />
        </button>
        <h2 className="text-2xl font-extrabold mb-4 text-center text-white font-['Sora',_sans-serif]">
          Have a Promocode?
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Enter your discount code below, or skip to continue.
        </p>
        <input
          type="text"
          value={input}
          autoFocus
          onChange={(e) => {
            setInput(e.target.value);
            setApplyError(null);
          }}
          placeholder="Enter promocode"
          className="w-full py-3 px-4 rounded-lg bg-[#222741] text-white focus:outline-[#00C896] mb-3 border border-gray-700"
          onKeyDown={e => {
            if (e.key === "Enter") handleApply();
          }}
        />
        {applyError && (
          <div className="mb-3 text-center text-red-400 flex items-center justify-center gap-2 transition-all animate-pulse">
            <AlertCircle size={18} /> {applyError}
          </div>
        )}
        {successApplied && (
          <div className="mb-3 text-center text-green-400 flex items-center justify-center gap-2">
            <CheckCircle2 size={18} /> Code <span className="font-bold text-white">{successApplied.code}</span> applied! {successApplied.description}
          </div>
        )}
        <button
          className="w-full mt-1 bg-[#00C896] hover:bg-[#00b488] text-black font-bold py-3 rounded-lg transition duration-200 mb-2"
          onClick={handleApply}
        >
          Apply Code
        </button>
        <button
          className="w-full bg-gray-700 text-gray-200 font-bold py-3 rounded-lg transition duration-200 mb-2 hover:bg-gray-600"
          onClick={handleSkip}
        >
          Skip & Continue Without Code
        </button>
        <div className="text-xs text-gray-400 text-center mt-2">Only one discount can be applied per order.</div>
      </div>
    </div>
  );
};

export default PromocodeModal;
