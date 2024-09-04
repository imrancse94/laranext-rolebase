import { NextRequest, NextResponse } from "next/server";
import {auth, signOut} from "@/auth";
import {redirect} from "next/navigation";
import {LOGIN} from "@/libs/routes";

export const GET = async (request) => {
  await signOut();

}