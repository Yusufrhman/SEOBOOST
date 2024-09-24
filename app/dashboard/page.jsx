"use client";
import { IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
export default function Dashboard() {
  redirect("/dashboard/new");
}
