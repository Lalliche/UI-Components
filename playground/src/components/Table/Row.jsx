"use client";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

const FormattedApplyDate = ({ applyDate }) => {
  const formattedDate = new Date(applyDate).toLocaleString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <p className="text-[0.8em] text-[#232D42] pr-[0.5em] line-clamp-1 font-bold w-[20%]   ">
      {formattedDate}
    </p>
  );
};

const statusTranslations = {
  Abolished: "Aboli",
  Requested: "Demandé",
  Refused: "Refusé",
  "In Progress": "En cours",
  Done: "Terminé",
  Expired: "Expiré",
};

const Row = ({ data, setUser }) => {
  const renderIcon = () => {
    return <FaRegUser className="text-[#a9abab] w-[80%] h-[80%]" />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Requested":
        return (
          <AiOutlineClockCircle className="text-[#FFAA2D]  w-[1em] h-[1em]  " />
        );
      case "In Progress":
        return (
          <AiOutlineClockCircle className="text-[#FFD700]  w-[1em] h-[1em]" />
        );
      case "Done":
        return (
          <AiOutlineCheckCircle className="text-[#28A745] w-[1em] h-[1em]  " />
        );
      case "Refused":
        return (
          <AiOutlineCloseCircle className="text-[#D32F2F]  w-[1em] h-[1em]" />
        );
      case "Expired":
        return (
          <AiOutlineClockCircle className="text-[#808080]  w-[1em] h-[1em]" />
        );
      case "Abolished":
        return (
          <AiOutlineCloseCircle className="text-[#808080]  w-[1em] h-[1em]" />
        );
      default:
        return null;
    }
  };

  const renderButtons = (status) => {
    switch (status) {
      case "Requested":
        return (
          <>
            <button
              className="px-[0.75em] py-[0.5em] center rounded-lg bg-[#2D60FF] border border-[#7280FF] font-medium text-white duration-[450ms] ease-in-out transition-all hover:scale-105"
              onClick={() => setUser(data)}
            >
              Évaluer
            </button>
          </>
        );
      case "Refused":
      case "Abolished":
      case "Expired":
        return null;
      case "In Progress":
      case "Done":
        return (
          <>
            <Link
              href={`RecruiterCandidates/${id}_${data?.hunter?.id}_${data?.id}_${data?.hunter?.last_name}`}
              className="px-[0.75em] py-[0.5em] center rounded-lg bg-[#2D60FF] border border-[#7280FF] font-medium text-white duration-[450ms] ease-in-out transition-all hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              Voir Candidats
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="flex  flex-row items-center gap-[0.5em] w-full border-b-2 border-[#EAECF0] py-[1em] px-[1em] hover:bg-[#F9FAFB] cursor-pointer"
      onClick={() => setUser(data)}
    >
      <div className="flex flex-row items-center justify-start gap-[0.75em] w-[25%] flex-shrink-0  ">
        {data?.hunter?.personal_profile?.picture ? (
          <div className="h-[2.5em] p-[0.25em] w-[2.5em] flex-shrink-0 center relative hover:cursor-pointer">
            <Image
              src={data?.hunter?.personal_profile?.picture}
              alt="Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              sizes="100%"
            />
          </div>
        ) : (
          <div className="h-[2.5em] w-[2.5em] p-[0.25em] center relative hover:cursor-pointer border border-[#a9abab] rounded-full">
            {renderIcon()}
          </div>
        )}
        <div className="flex flex-col justify-center line-clamp-1">
          <p className="font-bold text-[#101828] text-[1em]">
            {data?.hunter?.first_name + " " + data?.hunter?.last_name}
          </p>
          <p className="text-[0.8em] leading-[1.75] text-[#667085] font-medium">
            {data?.hunter?.email}
          </p>
        </div>
      </div>
      <p className="text-[1em] text-[#232D42] w-[20%] line-clamp-1 font-bold   ">
        {data?.hunter?.personal_profile?.activity_field?.name}
      </p>
      <FormattedApplyDate applyDate={data?.apply_date} />
      <div className="flex flex-row items-center gap-[0.5em] w-[12.5%]  flex-wrap flex-shrink-0 ">
        {getStatusIcon(data?.status)}
        <p className="font-bold text-[#232D42]">
          {statusTranslations[data?.status] || data?.status}
        </p>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-[0.75em] items-center text-[0.75em] w-[22.5%]   ">
        {renderButtons(data?.status)}
      </div>
    </div>
  );
};

export default Row;
